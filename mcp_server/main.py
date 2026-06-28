# mcp_server/main.py
# Point d'entrée du serveur MCP.
# Lance : uvicorn mcp_server.main:app --reload --port 8001

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mcp_server.routers import transactions

app = FastAPI(title="MCP Server — DWEXO Transactions", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])

# Router principal — toutes les routes sous /tools/transactions/
app.include_router(transactions.router, prefix="/tools/transactions")


@app.get("/tools/list", tags=["Registry"])
def list_tools():
    """Registre d'outils consulté par l'agent au démarrage."""
    return {
        "server": "mcp-dwexo-transactions",
        "version": "1.0.0",
        "tools": [
            {"name":"create_debit",     "endpoint":"/tools/transactions/debit",          "method":"POST"},
            {"name":"create_credit",    "endpoint":"/tools/transactions/credit",         "method":"POST"},
            {"name":"create_transfert", "endpoint":"/tools/transactions/transfert",      "method":"POST"},
            {"name":"list_transactions","endpoint":"/tools/transactions/list",           "method":"POST"},
            {"name":"get_caisses",      "endpoint":"/tools/transactions/caisses/list",   "method":"GET"},
            {"name":"get_transaction",  "endpoint":"/tools/transactions/{id}",           "method":"GET"},
        ]
    }

@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok", "service": "mcp-dwexo-transactions"}