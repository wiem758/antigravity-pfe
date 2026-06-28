# agent/memory/conversation_store.py
#
# RÔLE : Mémoire conversationnelle par session.
# En dev  → dict Python en mémoire.
# En prod → remplacer par Redis (pip install redis).
#
# Chaque session stocke une liste de messages :
# [{"role":"user","content":"..."}, {"role":"assistant","content":"..."}]

from typing import List

# Stockage en mémoire (dict Python) — remplacer par Redis en prod
_STORE: dict[str, list] = {}

# Nombre maximum de messages conservés par session
MAX_HISTORY = 20


class ConversationStore:

    def get_history(self, session_id: str) -> List[dict]:
        """Retourne l'historique d'une session (liste de messages)."""
        return _STORE.get(session_id, [])

    def save_exchange(self, session_id: str, user_message: str, assistant_response: str) -> None:
        """Sauvegarde un échange utilisateur/assistant dans la session."""
        if session_id not in _STORE:
            _STORE[session_id] = []

        _STORE[session_id].append({"role": "user",      "content": user_message})
        _STORE[session_id].append({"role": "assistant", "content": assistant_response})

        # Garder uniquement les MAX_HISTORY derniers messages
        if len(_STORE[session_id]) > MAX_HISTORY:
            _STORE[session_id] = _STORE[session_id][-MAX_HISTORY:]

    def clear(self, session_id: str) -> None:
        """Supprime l'historique d'une session."""
        _STORE.pop(session_id, None)