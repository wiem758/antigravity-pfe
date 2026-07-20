# mcp_server/main.py
# Point d'entrée du serveur MCP DWEXO Finance.
# Lance : uvicorn mcp_server.main:app --reload --port 8001

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mcp_server.routers import (
    transactions, bordereaux, bilan, caisses, banks, analytics, settings,
)

app = FastAPI(title="MCP Server — DWEXO Finance", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers finance DWEXO ─────────────────────────────────────────────────
app.include_router(transactions.router,  prefix="/tools/transactions")
app.include_router(bordereaux.router,    prefix="/tools/bordereaux")
app.include_router(bilan.router,         prefix="/tools/bilan")
app.include_router(caisses.router,       prefix="/tools/caisses")
app.include_router(banks.router,         prefix="/tools/banks")
app.include_router(analytics.router,    prefix="/tools/analytics")
app.include_router(settings.router,     prefix="/tools/settings")


@app.get("/tools/list", tags=["Registry"])
def list_tools():
    """Registre d'outils consulté par l'agent au démarrage."""
    return {
        "server": "mcp-dwexo-finance",
        "version": "2.0.0",
        "modules": [
            "transactions", "bordereaux", "bilan", "caisses",
            "comptes_bancaires", "analytics", "parametres",
        ],
        "tools": [
            # Transactions
            {"name": "create_debit",       "endpoint": "/tools/transactions/debit",         "method": "POST"},
            {"name": "create_credit",      "endpoint": "/tools/transactions/credit",        "method": "POST"},
            {"name": "create_transfert",   "endpoint": "/tools/transactions/transfert",     "method": "POST"},
            {"name": "get_transactions",   "endpoint": "/tools/transactions/list",          "method": "POST"},
            {"name": "get_caisses",        "endpoint": "/tools/transactions/caisses/list", "method": "GET"},
            {"name": "get_transaction",    "endpoint": "/tools/transactions/{id}",          "method": "GET"},
            # Bordereaux
            {"name": "get_bordereaux",     "endpoint": "/tools/bordereaux/list",            "method": "POST"},
            {"name": "get_bordereau",      "endpoint": "/tools/bordereaux/{id}",            "method": "GET"},
            {"name": "create_bordereau",   "endpoint": "/tools/bordereaux/create",          "method": "POST"},
            {"name": "valider_bordereau",  "endpoint": "/tools/bordereaux/{id}/etat",       "method": "PATCH"},
            {"name": "annuler_bordereau",  "endpoint": "/tools/bordereaux/{id}/etat",       "method": "PATCH"},
            {"name": "modifier_bordereau", "endpoint": "/tools/bordereaux/{id}",            "method": "PATCH"},
            {"name": "supprimer_bordereau","endpoint": "/tools/bordereaux/{id}",            "method": "DELETE"},
            # Bilan
            {"name": "get_bilan",          "endpoint": "/tools/bilan",                      "method": "POST"},
            {"name": "export_bilan_pdf",   "endpoint": "/tools/bilan/export",               "method": "POST"},
            {"name": "export_bilan_excel", "endpoint": "/tools/bilan/export",               "method": "POST"},
            # Caisses
            {"name": "list_caisses",       "endpoint": "/tools/caisses",                    "method": "GET"},
            {"name": "get_caisse",         "endpoint": "/tools/caisses/{id}",               "method": "GET"},
            # Comptes bancaires
            {"name": "get_comptes_bancaires", "endpoint": "/tools/banks",                 "method": "GET"},
            {"name": "get_compte_bancaire",   "endpoint": "/tools/banks/{id}",            "method": "GET"},
            {"name": "get_solde_compte_bancaire", "endpoint": "/tools/banks/{id}/solde",  "method": "GET"},
            # Tableau de bord
            {"name": "get_tableau_de_bord",        "endpoint": "/tools/analytics/dashboard",           "method": "GET"},
            {"name": "get_prevision_financiere",   "endpoint": "/tools/analytics/forecast",            "method": "GET"},
            {"name": "get_etat_paiement_vente",    "endpoint": "/tools/analytics/paiement-vente",      "method": "GET"},
            {"name": "get_etat_paiement_achat",    "endpoint": "/tools/analytics/paiement-achat",      "method": "GET"},
            {"name": "get_depenses_par_categorie", "endpoint": "/tools/analytics/depenses-categories", "method": "GET"},
            {"name": "get_reglement_clients",      "endpoint": "/tools/analytics/reglement-clients",   "method": "GET"},
            {"name": "get_reglement_fournisseurs", "endpoint": "/tools/analytics/reglement-fournisseurs", "method": "GET"},
            # Paramètres
            {"name": "get_banques",              "endpoint": "/tools/settings/banks",                "method": "GET"},
            {"name": "create_banque",            "endpoint": "/tools/settings/banks",                "method": "POST"},
            {"name": "modifier_banque",          "endpoint": "/tools/settings/banks/{id}",         "method": "PATCH"},
            {"name": "supprimer_banque",         "endpoint": "/tools/settings/banks/{id}",         "method": "DELETE"},
            {"name": "get_params_caisses",       "endpoint": "/tools/settings/funds",              "method": "GET"},
            {"name": "create_params_caisse",     "endpoint": "/tools/settings/funds",              "method": "POST"},
            {"name": "modifier_params_caisse",   "endpoint": "/tools/settings/funds/{id}",       "method": "PATCH"},
            {"name": "supprimer_params_caisse",  "endpoint": "/tools/settings/funds/{id}",       "method": "DELETE"},
            {"name": "get_categories_depenses",  "endpoint": "/tools/settings/expense-categories", "method": "GET"},
            {"name": "create_categorie_depense", "endpoint": "/tools/settings/expense-categories", "method": "POST"},
            {"name": "supprimer_categorie_depense", "endpoint": "/tools/settings/expense-categories/{id}", "method": "DELETE"},
        ],
    }


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok", "service": "mcp-dwexo-finance", "version": "2.0.0"}
