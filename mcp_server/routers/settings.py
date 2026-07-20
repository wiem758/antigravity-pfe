# mcp_server/routers/settings.py

from fastapi import APIRouter, HTTPException, Security
from mcp_server.schemas.settings_schemas import (
    BankSettingCreate, BankSettingUpdate,
    FundSettingCreate, FundSettingUpdate,
    ExpenseCategoryCreate, SettingsSearchFilter,
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.settings_service import settings_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Paramètres"], dependencies=[Security(verify_api_key)])


# ── Banques (paramètres) ───────────────────────────────────────────────────
@router.get("/banks", response_model=ToolResult, summary="Lister les banques (paramètres)")
def list_banks(recherche: str | None = None) -> ToolResult:
    f = SettingsSearchFilter(recherche=recherche) if recherche else None
    return settings_service.list_banks(f)


@router.post("/banks", response_model=ToolResult, status_code=201, summary="Ajouter une banque")
def create_bank(p: BankSettingCreate) -> ToolResult:
    r = settings_service.create_bank(p)
    if not r.success:
        raise HTTPException(status_code=422, detail=r.error)
    return r


@router.patch("/banks/{bank_id}", response_model=ToolResult, summary="Modifier une banque")
def update_bank(bank_id: str, p: BankSettingUpdate) -> ToolResult:
    r = settings_service.update_bank(bank_id, p)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.delete("/banks/{bank_id}", response_model=ToolResult, summary="Supprimer une banque")
def delete_bank(bank_id: str) -> ToolResult:
    r = settings_service.delete_bank(bank_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


# ── Caisses (paramètres) ───────────────────────────────────────────────────
@router.get("/funds", response_model=ToolResult, summary="Lister les caisses (paramètres)")
def list_funds(recherche: str | None = None) -> ToolResult:
    f = SettingsSearchFilter(recherche=recherche) if recherche else None
    return settings_service.list_funds(f)


@router.post("/funds", response_model=ToolResult, status_code=201, summary="Ajouter une caisse")
def create_fund(p: FundSettingCreate) -> ToolResult:
    r = settings_service.create_fund(p)
    if not r.success:
        raise HTTPException(status_code=422, detail=r.error)
    return r


@router.patch("/funds/{fund_id}", response_model=ToolResult, summary="Modifier une caisse")
def update_fund(fund_id: str, p: FundSettingUpdate) -> ToolResult:
    r = settings_service.update_fund(fund_id, p)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.delete("/funds/{fund_id}", response_model=ToolResult, summary="Supprimer une caisse")
def delete_fund(fund_id: str) -> ToolResult:
    r = settings_service.delete_fund(fund_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


# ── Catégories de dépenses ─────────────────────────────────────────────────
@router.get("/expense-categories", response_model=ToolResult,
            summary="Lister les catégories de dépenses")
def list_categories(recherche: str | None = None) -> ToolResult:
    f = SettingsSearchFilter(recherche=recherche) if recherche else None
    return settings_service.list_expense_categories(f)


@router.post("/expense-categories", response_model=ToolResult, status_code=201,
            summary="Ajouter une catégorie de dépense")
def create_category(p: ExpenseCategoryCreate) -> ToolResult:
    r = settings_service.create_expense_category(p)
    if not r.success:
        raise HTTPException(status_code=422, detail=r.error)
    return r


@router.delete("/expense-categories/{categorie_id}", response_model=ToolResult,
               summary="Supprimer une catégorie de dépense")
def delete_category(categorie_id: str) -> ToolResult:
    r = settings_service.delete_expense_category(categorie_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r
