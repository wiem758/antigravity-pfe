# api/routes/chat.py
# Endpoint principal du chat conversationnel DWEXO.
# Flux : Angular → Gemini (intention) → dwexo_service → MCP → réponse multilingue

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
import os

from api.services.gemini_service import call_gemini as gemini_call
from agent.services.dwexo_service import execute as dwexo_execute

load_dotenv()

router = APIRouter(tags=["Chat"])

_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "finance_agent.txt"
SYSTEM_PROMPT = _PROMPT_PATH.read_text(encoding="utf-8") if _PROMPT_PATH.exists() else ""

# Mémoire conversationnelle en session
_SESSIONS: dict[str, list] = {}


class ChatRequest(BaseModel):
    message: str
    session_id: str


class ChatResponse(BaseModel):
    response: str
    session_id: str
    transaction_data: Optional[dict] = None
    tool_called: Optional[str] = None
    success: bool = True


def call_gemini(history: list, user_message: str) -> dict:
    return gemini_call(history, user_message, SYSTEM_PROMPT)


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    if req.session_id not in _SESSIONS:
        _SESSIONS[req.session_id] = []
    history = _SESSIONS[req.session_id]

    try:
        # 1. Gemini analyse l'intention et extrait les paramètres
        gemini_result = call_gemini(history, req.message)
        action = gemini_result.get("action", "unknown")
        langue = gemini_result.get("langue", "fr")
        params = gemini_result.get("params") or {}

        # 2. Exécution via MCP (dwexo_service)
        result = await dwexo_execute(action, params, langue)

        response_text = result.get("response", "")
        if not response_text and action == "unknown":
            response_text = gemini_result.get(
                "message_utilisateur",
                "Je suis votre assistant financier DWEXO. Comment puis-je vous aider ?",
            )

        # 3. Sauvegarder l'historique
        history.append({"role": "user", "content": req.message})
        history.append({"role": "assistant", "content": response_text})
        if len(history) > 20:
            history = history[-20:]
        _SESSIONS[req.session_id] = history

        return ChatResponse(
            response=response_text,
            session_id=req.session_id,
            transaction_data=result.get("transaction_data"),
            tool_called=action if action != "unknown" else None,
            success=result.get("success", True),
        )

    except Exception as e:
        return ChatResponse(
            response=f"❌ Erreur serveur : {str(e)}",
            session_id=req.session_id,
            success=False,
        )
