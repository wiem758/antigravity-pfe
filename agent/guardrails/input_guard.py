# agent/guardrails/input_guard.py
#
# RÔLE : Première barrière de sécurité.
# Vérifie AVANT d'appeler Gemini que la demande :
#   1. N'est pas une tentative de jailbreak / injection
#   2. Concerne bien les transactions / finances DWEXO
#
# Retourne un dict {is_valid, rejection_message}

import re

# Patterns de jailbreak les plus courants
JAILBREAK_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"oublie\s+(toutes?\s+)?tes\s+instructions",
    r"tu\s+es\s+maintenant",
    r"act\s+as",
    r"pretend\s+you\s+are",
    r"DAN\s+mode",
    r"jailbreak",
    r"system\s*prompt",
]

# Mots-clés qui indiquent une demande financière légitime
FINANCE_KEYWORDS = [
    "transaction", "débit", "credit", "crédit", "transfert", "payer",
    "encaisser", "virer", "caisse", "solde", "facture", "fournisseur",
    "client", "montant", "tnd", "eur", "usd", "espèce", "chèque",
    "virement", "liste", "afficher", "voir", "consulter", "bonjour",
    "merci", "aide", "aide-moi", "comment", "quel", "quelle",
]


class InputGuard:

    def check(self, message: str) -> dict:
        """
        Vérifie la demande et retourne :
          {"is_valid": True}  → demande acceptée
          {"is_valid": False, "rejection_message": "..."}  → refusée
        """
        msg_lower = message.lower().strip()

        # ── 1. Détection jailbreak ─────────────────────
        for pattern in JAILBREAK_PATTERNS:
            if re.search(pattern, msg_lower, re.IGNORECASE):
                return {
                    "is_valid": False,
                    "rejection_message": (
                        "Je ne peux pas traiter cette demande. "
                        "Je suis un assistant financier DWEXO dédié aux transactions."
                    )
                }

        # ── 2. Demande trop courte ou vide ─────────────
        if len(msg_lower.strip()) < 3:
            return {
                "is_valid": False,
                "rejection_message": "Pouvez-vous préciser votre demande ?"
            }

        # ── 3. Vérification périmètre financier ────────
        # Si aucun mot-clé financier → probablement hors scope
        has_finance_keyword = any(kw in msg_lower for kw in FINANCE_KEYWORDS)

        if not has_finance_keyword and len(msg_lower) > 30:
            return {
                "is_valid": False,
                "rejection_message": (
                    "Je suis spécialisé dans la gestion des transactions financières DWEXO. "
                    "Je peux vous aider à enregistrer des débits, crédits, transferts, "
                    "ou consulter vos transactions et soldes de caisses.\n\n"
                    "Comment puis-je vous aider ?"
                )
            }

        return {"is_valid": True, "rejection_message": None}