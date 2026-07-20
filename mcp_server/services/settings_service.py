# mcp_server/services/settings_service.py
# Logique métier Paramètres DWEXO : Banques, Caisses, Catégories de dépenses

import uuid
from datetime import datetime
from mcp_server.schemas.settings_schemas import (
    BankSettingCreate, BankSettingUpdate,
    FundSettingCreate, FundSettingUpdate,
    ExpenseCategoryCreate, SettingsSearchFilter,
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.dwexo_api_client import call_dwexo_sync

_BANKS: dict[str, dict] = {
    "set-bank-001": {
        "id": "set-bank-001",
        "banque": "Banque souhir",
        "rib": "08 012 0001234567890123 45",
        "iban": "TN59 0801 2000 1234 5678 9012 345",
        "bic": "BSTUTNTT",
        "devise": "TND",
        "created_at": "2026-06-29T15:57:00",
        "updated_at": "2026-06-29T15:57:00",
    },
}

_FUNDS: dict[str, dict] = {
    "set-fund-001": {
        "id": "set-fund-001",
        "nom": "Caisse bureau",
        "responsable": "Ouvert",
        "type_caisse": "GENERAL",
        "statut": "OPEN",
        "parent": None,
        "created_at": "2026-06-29T15:57:00",
        "updated_at": "2026-06-29T15:57:00",
    },
}

_CATEGORIES: dict[str, dict] = {}


class SettingsService:

    def _filter(self, items: list, f: SettingsSearchFilter | None) -> list:
        if not f or not f.recherche:
            return items
        q = f.recherche.lower()
        return [
            i for i in items
            if q in str(i.get("nom", i.get("banque", ""))).lower()
        ]

    # ── Banques (paramètres) ─────────────────────────────────────────────
    def list_banks(self, f: SettingsSearchFilter | None = None) -> ToolResult:
        live = call_dwexo_sync("GET", "/settings-finance/banks")
        if live is not None:
            return ToolResult(success=True, data=live, total=len(live) if isinstance(live, list) else 0)
        items = self._filter(list(_BANKS.values()), f)
        return ToolResult(success=True, data=items, total=len(items))

    def create_bank(self, p: BankSettingCreate) -> ToolResult:
        live = call_dwexo_sync("POST", "/settings-finance/banks", json_body=p.model_dump(mode="json"))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        new_id = f"set-bank-{str(uuid.uuid4())[:8]}"
        now = datetime.now().isoformat()
        b = {"id": new_id, **p.model_dump(mode="json"), "created_at": now, "updated_at": now}
        _BANKS[new_id] = b
        return ToolResult(success=True, data=b, total=1)

    def update_bank(self, bank_id: str, p: BankSettingUpdate) -> ToolResult:
        b = _BANKS.get(bank_id)
        if not b:
            return ToolResult(success=False, error=f"Banque '{bank_id}' introuvable")
        for k, v in p.model_dump(exclude_none=True).items():
            b[k] = v.value if hasattr(v, "value") else v
        b["updated_at"] = datetime.now().isoformat()
        return ToolResult(success=True, data=b, total=1)

    def delete_bank(self, bank_id: str) -> ToolResult:
        b = _BANKS.pop(bank_id, None)
        if not b:
            return ToolResult(success=False, error=f"Banque '{bank_id}' introuvable")
        return ToolResult(success=True, data={"deleted": True, "banque": b["banque"]}, total=1)

    # ── Caisses (paramètres) ───────────────────────────────────────────────
    def list_funds(self, f: SettingsSearchFilter | None = None) -> ToolResult:
        live = call_dwexo_sync("GET", "/settings-finance/funds")
        if live is not None:
            return ToolResult(success=True, data=live, total=len(live) if isinstance(live, list) else 0)
        items = self._filter(list(_FUNDS.values()), f)
        return ToolResult(success=True, data=items, total=len(items))

    def create_fund(self, p: FundSettingCreate) -> ToolResult:
        live = call_dwexo_sync("POST", "/settings-finance/funds", json_body=p.model_dump(mode="json"))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        new_id = f"set-fund-{str(uuid.uuid4())[:8]}"
        now = datetime.now().isoformat()
        fund = {"id": new_id, **p.model_dump(), "created_at": now, "updated_at": now}
        _FUNDS[new_id] = fund
        return ToolResult(success=True, data=fund, total=1)

    def update_fund(self, fund_id: str, p: FundSettingUpdate) -> ToolResult:
        f = _FUNDS.get(fund_id)
        if not f:
            return ToolResult(success=False, error=f"Caisse '{fund_id}' introuvable")
        for k, v in p.model_dump(exclude_none=True).items():
            f[k] = v
        f["updated_at"] = datetime.now().isoformat()
        return ToolResult(success=True, data=f, total=1)

    def delete_fund(self, fund_id: str) -> ToolResult:
        f = _FUNDS.pop(fund_id, None)
        if not f:
            return ToolResult(success=False, error=f"Caisse '{fund_id}' introuvable")
        return ToolResult(success=True, data={"deleted": True, "nom": f["nom"]}, total=1)

    # ── Catégories de dépenses ─────────────────────────────────────────────
    def list_expense_categories(self, f: SettingsSearchFilter | None = None) -> ToolResult:
        live = call_dwexo_sync("GET", "/settings-finance/expense-categories")
        if live is not None:
            return ToolResult(success=True, data=live, total=len(live) if isinstance(live, list) else 0)
        items = self._filter(list(_CATEGORIES.values()), f)
        return ToolResult(success=True, data=items, total=len(items))

    def create_expense_category(self, p: ExpenseCategoryCreate) -> ToolResult:
        live = call_dwexo_sync(
            "POST", "/settings-finance/expense-categories",
            json_body=p.model_dump(mode="json"),
        )
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        new_id = f"cat-{str(uuid.uuid4())[:8]}"
        now = datetime.now().isoformat()
        cat = {"id": new_id, **p.model_dump(), "created_at": now, "updated_at": now}
        _CATEGORIES[new_id] = cat
        return ToolResult(success=True, data=cat, total=1)

    def delete_expense_category(self, categorie_id: str) -> ToolResult:
        c = _CATEGORIES.pop(categorie_id, None)
        if not c:
            return ToolResult(success=False, error=f"Catégorie '{categorie_id}' introuvable")
        return ToolResult(success=True, data={"deleted": True, "nom": c["nom"]}, total=1)


settings_service = SettingsService()
