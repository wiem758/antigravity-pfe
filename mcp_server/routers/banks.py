# mcp_server/routers/banks.py

from fastapi import APIRouter, HTTPException, Security
from mcp_server.schemas.bank_schemas import (
    BankAccountFilter, BankAccountCreate, BankAccountUpdate,
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.bank_service import bank_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Comptes bancaires"], dependencies=[Security(verify_api_key)])


@router.get("", response_model=ToolResult, summary="Lister les comptes bancaires")
def list_banks(f: BankAccountFilter = BankAccountFilter()) -> ToolResult:
    return bank_service.list_accounts(f)


@router.get("/{bank_id}", response_model=ToolResult, summary="Détail d'un compte bancaire")
def get_bank(bank_id: str) -> ToolResult:
    r = bank_service.get_account(bank_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.get("/{bank_id}/solde", response_model=ToolResult, summary="Solde et historique")
def get_solde(bank_id: str) -> ToolResult:
    r = bank_service.get_solde(bank_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.post("", response_model=ToolResult, status_code=201, summary="Créer un compte bancaire")
def create_bank(p: BankAccountCreate) -> ToolResult:
    r = bank_service.create_account(p)
    if not r.success:
        raise HTTPException(status_code=422, detail=r.error)
    return r


@router.patch("/{bank_id}", response_model=ToolResult, summary="Modifier un compte bancaire")
def update_bank(bank_id: str, p: BankAccountUpdate) -> ToolResult:
    r = bank_service.update_account(bank_id, p)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.delete("/{bank_id}", response_model=ToolResult, summary="Supprimer un compte bancaire")
def delete_bank(bank_id: str) -> ToolResult:
    r = bank_service.delete_account(bank_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r
