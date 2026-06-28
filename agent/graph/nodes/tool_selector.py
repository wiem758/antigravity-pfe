# agent/graph/nodes/tool_selector.py
#
# NŒUD 3 — Gemini extrait les paramètres structurés de la phrase
# et choisit l'outil MCP exact à appeler.
#
# Entrée  : state["intent"] + state["messages"]
# Sortie  : state["tool_name"] + state["tool_params"]

import json
from datetime import date
from langchain_core.messages import SystemMessage, HumanMessage
from agent.llm.gemini_client import gemini_client

# Mapping intent → outil MCP
INTENT_TO_TOOL = {
    "debit":     "create_debit",
    "credit":    "create_credit",
    "transfert": "create_transfert",
    "list":      "list_transactions",
    "info":      "get_caisses",
}

EXTRACT_PROMPT = """Tu es un extracteur de paramètres pour l'application financière DWEXO.

À partir de la demande de l'utilisateur, extrait les paramètres nécessaires pour appeler l'outil '{tool_name}'.

Caisses disponibles :
- caisse-001 : Caisse Espèce TND
- caisse-002 : Caisse Espèce EUR
- caisse-003 : Caisse Principale TND

Règles d'extraction :
- Devise non précisée → "TND"
- Mode paiement non précisé → "Espèce"
- État non précisé → "Payé"
- Date non précisée → "{today}"
- Montant en EUR mentionné → caisse-002, sinon caisse-001
- Pour un transfert : source_id et destination_id doivent être différents

Réponds UNIQUEMENT avec un JSON valide contenant les paramètres extraits.
Ne mets aucun texte avant ou après le JSON.
"""


def extract_params(state: dict) -> dict:
    """
    Nœud 3 : utilise Gemini pour extraire les paramètres
    structurés depuis la phrase en langage naturel.
    """
    intent = state.get("intent", "")
    tool_name = INTENT_TO_TOOL.get(intent)

    # Pas d'outil pour ces intents → synthèse directe
    if not tool_name or intent in ("info",):
        return {**state, "tool_name": tool_name or "get_caisses", "tool_params": {}}

    # Récupérer le dernier message utilisateur
    last_user_msg = ""
    for m in reversed(state["messages"]):
        if m["role"] == "user":
            last_user_msg = m["content"]
            break

    today = date.today().isoformat()
    llm   = gemini_client.get_llm()

    try:
        prompt = EXTRACT_PROMPT.format(tool_name=tool_name, today=today)
        response = llm.invoke([
            SystemMessage(content=prompt),
            HumanMessage(content=f'Demande : "{last_user_msg}"')
        ])

        raw = response.content.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        params = json.loads(raw)

    except Exception:
        # Fallback : paramètres minimaux selon l'intent
        params = _fallback_params(intent, last_user_msg, today)

    return {**state, "tool_name": tool_name, "tool_params": params}


def _fallback_params(intent: str, message: str, today: str) -> dict:
    """Paramètres minimaux en cas d'échec du parsing Gemini."""
    import re
    # Extraire le montant avec regex
    montant_match = re.search(r'(\d+(?:[.,]\d+)?)\s*(?:tnd|eur|usd|dinars?)?', message.lower())
    montant = float(montant_match.group(1).replace(',', '.')) if montant_match else 0.0
    devise  = "EUR" if "eur" in message.lower() else "TND"
    caisse  = "caisse-002" if devise == "EUR" else "caisse-001"

    if intent == "debit":
        return {"caisse_id": caisse, "montant": montant, "mode_paiement": "Espèce",
                "date_reglement": today, "etat": "Payé", "devise": devise}
    elif intent == "credit":
        return {"caisse_id": caisse, "montant": montant, "mode_paiement": "Espèce",
                "date_reglement": today, "etat": "Payé", "devise": devise}
    elif intent == "transfert":
        return {"source_id": "caisse-001", "destination_id": "caisse-003",
                "montant": montant, "devise": devise, "date_transfert": today}
    elif intent == "list":
        return {}
    return {}