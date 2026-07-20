# mcp_server/services/caisse_service.py
# Logique métier Caisses DWEXO (vue opérationnelle — pas paramètres)

from datetime import datetime
from math import ceil
from mcp_server.schemas.caisse_schemas import CaisseTransactionFilter
from mcp_server.schemas.common import ToolResult, PaginatedResponse
from mcp_server.services.dwexo_api_client import call_dwexo_sync

_CAISSES = {
    "caisse-001": {
        "id": "caisse-001",
        "nom": "CAISSE BUREAU",
        "responsable": "souhir rahem",
        "statut": "OPEN",
        "type": "GENERAL",
        "devise": "TND",
        "solde_debit": 0.0,
        "solde_credit": 10000.0,
        "solde": 10000.0,
        "derniere_modification": "2026-07-02T13:04:00",
    },
    "caisse-002": {
        "id": "caisse-002",
        "nom": "Caisse Espèce EUR",
        "responsable": None,
        "statut": "OPEN",
        "type": "GENERAL",
        "devise": "EUR",
        "solde_debit": 1997.0,
        "solde_credit": 5000.0,
        "solde": 3003.0,
        "derniere_modification": "2026-05-07T11:00:00",
    },
    "caisse-003": {
        "id": "caisse-003",
        "nom": "Caisse Principale",
        "responsable": None,
        "statut": "OPEN",
        "type": "GENERAL",
        "devise": "TND",
        "solde_debit": 0.0,
        "solde_credit": 25000.0,
        "solde": 25000.0,
        "derniere_modification": "2026-06-01T08:00:00",
    },
}

_MOCK_TX = [
    {
        "caisse_id": "caisse-001",
        "mode_paiement": "Espèce",
        "beneficiaire": "Client",
        "type_depense": None,
        "date_reglement": "2026-07-02",
        "montant": 10000.0,
        "porteur": "Espèce",
        "etat": "Payé",
        "devise": "TND",
        "sens": "credit",
    },
]


class CaisseService:

    def list_caisses(self) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/funds")
        if live is not None:
            return ToolResult(success=True, data=live, total=len(live) if isinstance(live, list) else 0)
        return ToolResult(success=True, data=list(_CAISSES.values()), total=len(_CAISSES))

    def get_caisse(self, caisse_id: str) -> ToolResult:
        live = call_dwexo_sync("GET", f"/finance/funds/{caisse_id}")
        if live is not None:
            return ToolResult(success=True, data=live, total=1)

        c = _CAISSES.get(caisse_id)
        if not c:
            for v in _CAISSES.values():
                if v["nom"].lower() == caisse_id.lower():
                    c = v
                    break
        if not c:
            return ToolResult(success=False, error=f"Caisse '{caisse_id}' introuvable")
        return ToolResult(success=True, data=c, total=1)

    def list_transactions(self, f: CaisseTransactionFilter) -> ToolResult:
        live = call_dwexo_sync(
            "POST", f"/finance/funds/{f.caisse_id}/transactions",
            json_body=f.model_dump(mode="json"),
        )
        if live is not None:
            return ToolResult(success=True, data=live, total=live.get("total", 0))

        try:
            items = [t for t in _MOCK_TX if t["caisse_id"] == f.caisse_id]
            if f.date_debut:
                items = [t for t in items if t["date_reglement"] >= f.date_debut.isoformat()]
            if f.date_fin:
                items = [t for t in items if t["date_reglement"] <= f.date_fin.isoformat()]

            total = len(items)
            start = (f.page - 1) * f.page_size
            paged = items[start:start + f.page_size]

            return ToolResult(
                success=True,
                data=PaginatedResponse(
                    items=paged, total=total,
                    page=f.page, page_size=f.page_size,
                    pages=ceil(total / f.page_size) if total else 1,
                ).model_dump(),
                total=total,
            )
        except Exception as e:
            return ToolResult(success=False, error=str(e))


caisse_service = CaisseService()
