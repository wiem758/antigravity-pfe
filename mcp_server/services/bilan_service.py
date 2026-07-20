# mcp_server/services/bilan_service.py
# Logique métier Bilan DWEXO — résumé débit/crédit/solde + liste transactions

from math import ceil
from mcp_server.schemas.bilan_schemas import BilanFilter, BilanExportRequest
from mcp_server.schemas.common import ToolResult, PaginatedResponse
from mcp_server.services.dwexo_api_client import call_dwexo_sync

_MOCK_TRANSACTIONS = [
    {
        "date_reglement": "2026-07-02",
        "porteur": "Espèce",
        "reference": "TRX-2026-0042",
        "facture_bc": "FAC-2026-010",
        "debit": 0.0,
        "credit": 10000.0,
        "devise": "TND",
        "etat": "Payé",
        "caisse_id": "caisse-001",
        "mode_paiement": "Espèce",
    },
    {
        "date_reglement": "2026-05-07",
        "porteur": "Espèce",
        "reference": "TRX-2026-0001",
        "facture_bc": "FAC-2026-001",
        "debit": 0.0,
        "credit": 1000.0,
        "devise": "TND",
        "etat": "Payé",
        "caisse_id": "caisse-001",
        "mode_paiement": "Espèce",
    },
    {
        "date_reglement": "2026-05-07",
        "porteur": "Espèce",
        "reference": "TRX-2026-0003",
        "facture_bc": "FAC-ACH-001",
        "debit": 1997.0,
        "credit": 0.0,
        "devise": "EUR",
        "etat": "Payé",
        "caisse_id": "caisse-002",
        "mode_paiement": "Espèce",
    },
]


class BilanService:

    def get_bilan(self, f: BilanFilter) -> ToolResult:
        live = call_dwexo_sync("POST", "/finance/bilan", json_body=f.model_dump(mode="json"))
        if live is not None:
            return ToolResult(success=True, data=live, total=live.get("total", 0))

        try:
            items = list(_MOCK_TRANSACTIONS)

            if f.caisse_id:
                items = [t for t in items if t.get("caisse_id") == f.caisse_id]
            if f.mode_paiement:
                items = [t for t in items if t.get("mode_paiement") == f.mode_paiement.value]
            if f.etat and f.etat.value != "Tous":
                items = [t for t in items if t.get("etat") == f.etat.value]
            if f.recherche:
                q = f.recherche.lower()
                items = [t for t in items if q in t.get("reference", "").lower()
                         or q in t.get("facture_bc", "").lower()]
            if f.date_reglement_debut:
                items = [t for t in items if t["date_reglement"] >= f.date_reglement_debut.isoformat()]
            if f.date_reglement_fin:
                items = [t for t in items if t["date_reglement"] <= f.date_reglement_fin.isoformat()]

            total_debit = sum(t["debit"] for t in items)
            total_credit = sum(t["credit"] for t in items)
            solde = total_credit - total_debit

            total = len(items)
            start = (f.page - 1) * f.page_size
            paged = items[start:start + f.page_size]

            return ToolResult(
                success=True,
                data={
                    "resume": {
                        "devise": f.devise,
                        "total_debit": total_debit,
                        "total_credit": total_credit,
                        "solde": solde,
                    },
                    "transactions": PaginatedResponse(
                        items=paged, total=total,
                        page=f.page, page_size=f.page_size,
                        pages=ceil(total / f.page_size) if total else 1,
                    ).model_dump(),
                    "total_debit": total_debit,
                    "total_credit": total_credit,
                    "solde": solde,
                    "devise": f.devise,
                },
                total=total,
            )
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    def export_bilan(self, req: BilanExportRequest) -> ToolResult:
        bilan = self.get_bilan(req)
        if not bilan.success:
            return bilan

        fmt = req.format.lower()
        return ToolResult(
            success=True,
            data={
                "format": fmt,
                "filename": f"bilan_{req.devise}.{fmt}",
                "url": f"/exports/bilan_{req.devise}.{fmt}",
                "resume": bilan.data.get("resume") if isinstance(bilan.data, dict) else {},
            },
            total=1,
        )


bilan_service = BilanService()
