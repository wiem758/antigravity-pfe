# agent/graph/nodes/domain_validator.py
#
# NŒUD 2 — Valide que l'intent est dans le périmètre DWEXO.
# Si hors-scope → domain_valid=False + message de refus prêt.

ALLOWED_INTENTS = {"debit", "credit", "transfert", "list", "info"}

REFUSAL_MESSAGES = {
    "hors-scope": (
        "Je suis spécialisé dans la gestion des transactions financières DWEXO.\n\n"
        "Je peux vous aider à :\n"
        "• 💳 Enregistrer un débit (paiement fournisseur)\n"
        "• 💰 Enregistrer un crédit (encaissement client)\n"
        "• 🔄 Effectuer un transfert entre caisses\n"
        "• 📋 Consulter vos transactions\n"
        "• 💼 Vérifier vos soldes de caisses\n\n"
        "Comment puis-je vous aider ?"
    )
}


def validate_domain(state: dict) -> dict:
    """
    Nœud 2 : vérifie que l'intent est autorisé.
    Entrée  : state["intent"]
    Sortie  : state["domain_valid"] + state["rejection_reason"]
    """
    intent = state.get("intent", "hors-scope")

    if intent in ALLOWED_INTENTS:
        return {**state, "domain_valid": True, "rejection_reason": None}
    else:
        return {
            **state,
            "domain_valid":     False,
            "rejection_reason": REFUSAL_MESSAGES.get(intent, REFUSAL_MESSAGES["hors-scope"]),
            "response":         REFUSAL_MESSAGES.get(intent, REFUSAL_MESSAGES["hors-scope"]),
        }