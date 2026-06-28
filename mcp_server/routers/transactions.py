# mcp_server/routers/transactions.py
# 6 endpoints HTTP exposés au serveur agent.
# Toutes les routes exigent X-API-Key.

from fastapi import APIRouter, HTTPException, Security, status

from mcp_server.schemas.transaction_schemas import (
    TransactionDebitCreate, TransactionCreditCreate,
    TransactionTransfertCreate, TransactionFilter,
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.transaction_service import transaction_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Transactions"], dependencies=[Security(verify_api_key)])


@router.post("/debit", response_model=ToolResult, status_code=201,
             summary="Créer un DÉBIT (argent qui sort)")
def create_debit(p: TransactionDebitCreate) -> ToolResult:
    r = transaction_service.create_debit(p)
    if not r.success:
        raise HTTPException(status_code=400, detail=r.error)
    return r


@router.post("/credit", response_model=ToolResult, status_code=201,
             summary="Créer un CRÉDIT (argent qui entre)")
def create_credit(p: TransactionCreditCreate) -> ToolResult:
    r = transaction_service.create_credit(p)
    if not r.success:
        raise HTTPException(status_code=400, detail=r.error)
    return r


@router.post("/transfert", response_model=ToolResult, status_code=201,
             summary="Transfert entre caisses/comptes")
def create_transfert(p: TransactionTransfertCreate) -> ToolResult:
    r = transaction_service.create_transfert(p)
    if not r.success:
        raise HTTPException(status_code=400, detail=r.error)
    return r


@router.post("/list", response_model=ToolResult,
             summary="Lister les transactions avec filtres")
def list_transactions(f: TransactionFilter) -> ToolResult:
    r = transaction_service.list_transactions(f)
    if not r.success:
        raise HTTPException(status_code=500, detail=r.error)
    return r


@router.get("/caisses/list", response_model=ToolResult,
            summary="Soldes des caisses")
def get_caisses() -> ToolResult:
    return transaction_service.get_caisses()


@router.get("/{transaction_id}", response_model=ToolResult,
            summary="Détail d'une transaction")
def get_transaction(transaction_id: str) -> ToolResult:
    r = transaction_service.get_transaction(transaction_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r