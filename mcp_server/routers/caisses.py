# mcp_server/routers/caisses.py

from fastapi import APIRouter, HTTPException, Security
from mcp_server.schemas.caisse_schemas import CaisseTransactionFilter
from mcp_server.schemas.common import ToolResult
from mcp_server.services.caisse_service import caisse_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Caisses"], dependencies=[Security(verify_api_key)])


@router.get("", response_model=ToolResult, summary="Lister les caisses opérationnelles")
def list_caisses() -> ToolResult:
    return caisse_service.list_caisses()


@router.get("/{caisse_id}", response_model=ToolResult, summary="Détail d'une caisse")
def get_caisse(caisse_id: str) -> ToolResult:
    r = caisse_service.get_caisse(caisse_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.post("/{caisse_id}/transactions", response_model=ToolResult,
             summary="Transactions d'une caisse")
def list_caisse_transactions(caisse_id: str, f: CaisseTransactionFilter) -> ToolResult:
    f.caisse_id = caisse_id
    r = caisse_service.list_transactions(f)
    if not r.success:
        raise HTTPException(status_code=500, detail=r.error)
    return r
