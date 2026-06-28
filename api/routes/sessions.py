# api/routes/sessions.py
# Endpoints de gestion des sessions conversationnelles.

from fastapi import APIRouter
from agent.memory.conversation_store import ConversationStore

router  = APIRouter(tags=["Sessions"])
_memory = ConversationStore()

@router.get("/sessions/{session_id}")
def get_session(session_id: str):
    """Retourne l'historique d'une session (utilisé par Angular)."""
    return {"session_id": session_id, "history": _memory.get_history(session_id)}

@router.delete("/sessions/{session_id}")
def delete_session(session_id: str):
    """Supprime une session (réinitialise la mémoire)."""
    _memory.clear(session_id)
    return {"deleted": True, "session_id": session_id}