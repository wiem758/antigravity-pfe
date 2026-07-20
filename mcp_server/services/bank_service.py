# mcp_server/services/bank_service.py
# Logique métier Comptes bancaires DWEXO

import uuid
from datetime import datetime
from mcp_server.schemas.bank_schemas import (
    BankAccountFilter, BankAccountCreate, BankAccountUpdate,
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.dwexo_api_client import call_dwexo_sync

_DB: dict[str, dict] = {
    "bank-001": {
        "id": "bank-001",
        "nom": "Banque souhir",
        "rib": "08 012 0001234567890123 45",
        "iban": "TN59 0801 2000 1234 5678 9012 345",
        "bic": "BSTUTNTT",
        "devise": "TND",
        "espece": 0.0,
        "cheque": None,
        "traite": None,
        "virement": None,
        "total": None,
        "solde_actuel": 0.0,
        "created_at": "2026-06-29T15:57:00",
        "updated_at": "2026-06-29T15:57:00",
    },
}


class BankService:

    def _find(self, bank_id: str) -> dict | None:
        b = _DB.get(bank_id)
        if b:
            return b
        for v in _DB.values():
            if v["nom"].lower() == bank_id.lower():
                return v
        return None

    def list_accounts(self, f: BankAccountFilter | None = None) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/banks")
        if live is not None:
            return ToolResult(success=True, data=live, total=len(live) if isinstance(live, list) else 0)

        items = list(_DB.values())
        if f:
            if f.nom:
                items = [b for b in items if f.nom.lower() in b["nom"].lower()]
            if f.devise:
                items = [b for b in items if b["devise"] == f.devise.value]
        return ToolResult(success=True, data=items, total=len(items))

    def get_account(self, bank_id: str) -> ToolResult:
        live = call_dwexo_sync("GET", f"/finance/banks/{bank_id}")
        if live is not None:
            return ToolResult(success=True, data=live, total=1)

        b = self._find(bank_id)
        if not b:
            return ToolResult(success=False, error=f"Compte bancaire '{bank_id}' introuvable")
        return ToolResult(success=True, data=b, total=1)

    def get_solde(self, bank_id: str) -> ToolResult:
        live = call_dwexo_sync("GET", f"/finance/banks/{bank_id}/solde")
        if live is not None:
            return ToolResult(success=True, data=live, total=1)

        b = self._find(bank_id)
        if not b:
            return ToolResult(success=False, error=f"Compte bancaire '{bank_id}' introuvable")

        return ToolResult(
            success=True,
            data={
                "nom": b["nom"],
                "devise": b["devise"],
                "solde_actuel": b["solde_actuel"],
                "espece": b.get("espece"),
                "cheque": b.get("cheque"),
                "traite": b.get("traite"),
                "virement": b.get("virement"),
                "historique": [
                    {"mois": "2025-08", "solde": 0.0},
                    {"mois": "2026-06", "solde": 0.0},
                ],
            },
            total=1,
        )

    def create_account(self, p: BankAccountCreate) -> ToolResult:
        live = call_dwexo_sync("POST", "/finance/banks", json_body=p.model_dump(mode="json"))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)

        new_id = f"bank-{str(uuid.uuid4())[:8]}"
        now = datetime.now().isoformat()
        b = {
            "id": new_id,
            "nom": p.nom,
            "rib": p.rib,
            "iban": p.iban,
            "bic": p.bic,
            "devise": p.devise.value,
            "espece": 0.0,
            "cheque": None,
            "traite": None,
            "virement": None,
            "total": 0.0,
            "solde_actuel": 0.0,
            "created_at": now,
            "updated_at": now,
        }
        _DB[new_id] = b
        return ToolResult(success=True, data=b, total=1)

    def update_account(self, bank_id: str, p: BankAccountUpdate) -> ToolResult:
        b = self._find(bank_id)
        if not b:
            return ToolResult(success=False, error=f"Compte bancaire '{bank_id}' introuvable")

        if p.nom:    b["nom"] = p.nom
        if p.rib:    b["rib"] = p.rib
        if p.iban:   b["iban"] = p.iban
        if p.bic:    b["bic"] = p.bic
        if p.devise: b["devise"] = p.devise.value
        b["updated_at"] = datetime.now().isoformat()
        return ToolResult(success=True, data=b, total=1)

    def delete_account(self, bank_id: str) -> ToolResult:
        b = self._find(bank_id)
        if not b:
            return ToolResult(success=False, error=f"Compte bancaire '{bank_id}' introuvable")
        del _DB[b["id"]]
        return ToolResult(success=True, data={"deleted": True, "nom": b["nom"]}, total=1)


bank_service = BankService()
