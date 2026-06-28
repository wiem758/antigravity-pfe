# agent/graph/nodes/executor.py
#
# NŒUD 4 — Appelle le serveur MCP via HTTP.
# C'est le pont entre Gemini et l'API DWEXO.
#
# Flux :
#   state["tool_name"] + state["tool_params"]
#       ↓
#   HTTP POST/GET → serveur MCP (port 8001)
#       ↓
#   MCP appelle l'API DWEXO
#       ↓
#   state["tool_result"] + state["transaction_data"]

import os
import httpx

MCP_URL     = os.getenv("MCP_SERVER_URL", "http://localhost:8001")
MCP_API_KEY = os.getenv("MCP_API_KEY",    "dev-secret-key")

# Table de routage : outil → (méthode, endpoint MCP)
ROUTES: dict[str, tuple[str, str]] = {
    "create_debit":      ("POST", "/tools/transactions/debit"),
    "create_credit":     ("POST", "/tools/transactions/credit"),
    "create_transfert":  ("POST", "/tools/transactions/transfert"),
    "list_transactions": ("POST", "/tools/transactions/list"),
    "get_caisses":       ("GET",  "/tools/transactions/caisses/list"),
    "get_transaction":   ("GET",  "/tools/transactions/{id}"),
}

CREATION_TOOLS = {"create_debit", "create_credit", "create_transfert"}


def execute_tool(state: dict) -> dict:
    """
    Nœud 4 : effectue l'appel HTTP vers le serveur MCP.
    Met à jour tool_result et transaction_data dans l'état.
    """
    tool_name   = state.get("tool_name")
    tool_params = state.get("tool_params", {}) or {}

    if not tool_name or tool_name not in ROUTES:
        return {**state, "tool_result": None,
                "error": f"Outil inconnu : {tool_name}"}

    method, endpoint = ROUTES[tool_name]

    # Remplacer les paramètres de chemin
    if "{id}" in endpoint:
        tx_id    = tool_params.pop("transaction_id", "")
        endpoint = endpoint.replace("{id}", tx_id)

    try:
        with httpx.Client(
            base_url=MCP_URL,
            headers={"X-API-Key": MCP_API_KEY, "Content-Type": "application/json"},
            timeout=30.0
        ) as client:
            if method == "POST":
                resp = client.post(endpoint, json=tool_params)
            else:
                resp = client.get(endpoint)

        result = resp.json()

        # Extraire les données de transaction si création réussie
        tx_data = None
        if result.get("success") and tool_name in CREATION_TOOLS:
            tx_data = result.get("data")

        return {
            **state,
            "tool_result":      result,
            "transaction_data": tx_data,
            "tool_called":      tool_name,
            "error":            None if result.get("success") else result.get("error"),
        }

    except httpx.ConnectError:
        return {
            **state,
            "tool_result": None,
            "tool_called": tool_name,
            "error":       "Serveur MCP inaccessible (port 8001). Vérifiez qu'il est démarré.",
        }
    except Exception as e:
        return {
            **state,
            "tool_result": None,
            "tool_called": tool_name,
            "error":       f"Erreur appel MCP : {e}",
        }