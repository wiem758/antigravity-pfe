# agent/graph/state.py
# TypedDict de l'état partagé entre tous les nœuds du graphe LangGraph.

from typing import TypedDict, Optional, List

class TransactionState(TypedDict):
    messages:         List[dict]      # Historique conversation
    session_id:       str             # ID de session (mémoire)
    intent:           Optional[str]   # debit/credit/transfert/list/info/hors-scope
    domain_valid:     Optional[bool]  # True si demande dans le périmètre
    rejection_reason: Optional[str]   # Raison du refus
    tool_name:        Optional[str]   # Outil MCP choisi par Gemini
    tool_params:      Optional[dict]  # Paramètres extraits par Gemini
    tool_result:      Optional[dict]  # Réponse JSON du MCP
    transaction_data: Optional[dict]  # Données transaction si créée
    tool_called:      Optional[str]   # Outil effectivement appelé
    error:            Optional[str]   # Erreur éventuelle
    response:         Optional[str]   # Réponse finale en français
    plan:             List[dict]      # Plan multi-étapes