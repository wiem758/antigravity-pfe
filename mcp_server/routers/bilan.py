# mcp_server/routers/bilan.py

from fastapi import APIRouter, HTTPException, Security
from mcp_server.schemas.bilan_schemas import BilanFilter, BilanExportRequest
from mcp_server.schemas.common import ToolResult
from mcp_server.services.bilan_service import bilan_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Bilan"], dependencies=[Security(verify_api_key)])


@router.post("", response_model=ToolResult, summary="Consulter le bilan financier")
def get_bilan(f: BilanFilter) -> ToolResult:
    """Résumé débit/crédit/solde + transactions filtrées (page Bilan DWEXO)."""
    r = bilan_service.get_bilan(f)
    if not r.success:
        raise HTTPException(status_code=500, detail=r.error)
    return r


@router.post("/export", response_model=ToolResult, summary="Exporter le bilan (PDF/Excel)")
def export_bilan(req: BilanExportRequest) -> ToolResult:
    r = bilan_service.export_bilan(req)
    if not r.success:
        raise HTTPException(status_code=500, detail=r.error)
    return r
