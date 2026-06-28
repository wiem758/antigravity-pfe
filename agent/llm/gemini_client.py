# agent/llm/gemini_client.py

import os
from pathlib import Path
from google import genai
from google.genai import types

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL   = "gemini-2.5-flash"  # ou "gemini-1.5-flash"
PROMPT_PATH    = Path(__file__).parent / "prompts" / "transaction_agent.txt"


class GeminiClient:

    def __init__(self):
        # Initialiser le client avec ta clé API
        self.client = genai.Client(api_key=GOOGLE_API_KEY)
        self.model  = GEMINI_MODEL
        self.system_prompt = self._load_prompt()

    def _load_prompt(self) -> str:
        if PROMPT_PATH.exists():
            return PROMPT_PATH.read_text(encoding="utf-8")
        return "Tu es un assistant financier DWEXO. Reponds en francais."

    def generate(self, user_message: str, history: list = None) -> str:
        """
        Envoie un message à Gemini et retourne la réponse texte.
        Utilisé par les nœuds du graphe LangGraph.
        """
        # Construire la liste des messages avec l'historique
        contents = []

        # Ajouter l'historique si disponible
        if history:
            for msg in history:
                role = "user" if msg["role"] == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part(text=msg["content"])]
                    )
                )

        # Ajouter le message actuel
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part(text=user_message)]
            )
        )

        response = self.client.models.generate_content(
            model=self.model,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=self.system_prompt,
                temperature=0.1,        # Déterministe pour les montants
                max_output_tokens=1024,
            )
        )

        return response.text

    def generate_json(self, prompt: str) -> str:
        """
        Utilisé par intent_classifier et tool_selector
        pour obtenir une réponse JSON structurée.
        """
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction="Réponds UNIQUEMENT avec un JSON valide. Pas de texte avant ou après.",
                temperature=0.0,
            )
        )
        return response.text


# Singleton — une seule instance partagée
gemini_client = GeminiClient()