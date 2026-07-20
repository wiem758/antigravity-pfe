# mcp_server/routers/bordereaux.py
#
# 7 endpoints HTTP exposés à l'agent MCP pour les bordereaux DWEXO.

from fastapi import APIRouter, HTTPException, Security, status
from mcp_server.schemas.bordereau_schemas import (
    BordereauCreate, BordereauFilter,
    BordereauUpdate, BordereauEtatUpdate
)
from mcp_server.schemas.common import ToolResult
from mcp_server.services.bordereau_service import bordereau_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Bordereaux"], dependencies=[Security(verify_api_key)])


@router.post("/list", response_model=ToolResult,
             summary="Lister les bordereaux avec filtres")
def list_bordereaux(f: BordereauFilter) -> ToolResult:
    """
    Liste les bordereaux avec filtres optionnels.
    Correspond à la vue principale Bordereaux de DWEXO.
    Filtres : référence, date_remise, état_global, état_transactions, type, montant.
    """
    r = bordereau_service.list_bordereaux(f)
    if not r.success:
        raise HTTPException(status_code=500, detail=r.error)
    return r


@router.get("/{bordereau_id}", response_model=ToolResult,
            summary="Récupérer un bordereau par ID ou référence")
def get_bordereau(bordereau_id: str) -> ToolResult:
    """Récupère un bordereau par son ID ou sa référence (ex: BRD-2026-0001)."""
    r = bordereau_service.get_bordereau(bordereau_id)
    if not r.success:
        raise HTTPException(status_code=404, detail=r.error)
    return r


@router.post("/create", response_model=ToolResult, status_code=201,
             summary="Créer un nouveau bordereau")
def create_bordereau(p: BordereauCreate) -> ToolResult:
    """
    Crée un nouveau bordereau.
    Correspond au bouton '+ AJOUTER' dans DWEXO.
    La référence est auto-générée si non fournie.
    """
    r = bordereau_service.create_bordereau(p)
    if not r.success:
        raise HTTPException(status_code=422, detail=r.error)
    return r


@router.patch("/{bordereau_id}", response_model=ToolResult,
              summary="Modifier un bordereau")
def update_bordereau(bordereau_id: str, p: BordereauUpdate) -> ToolResult:
    """Modifie les champs d'un bordereau existant. Un bordereau annulé ne peut pas être modifié."""
    r = bordereau_service.update_bordereau(bordereau_id, p)
    if not r.success:
        code = 404 if "introuvable" in (r.error or "") else 400
        raise HTTPException(status_code=code, detail=r.error)
    return r


@router.patch("/{bordereau_id}/etat", response_model=ToolResult,
              summary="Valider ou annuler un bordereau")
def update_etat(bordereau_id: str, p: BordereauEtatUpdate) -> ToolResult:
    """Change l'état global d'un bordereau (valider, annuler, etc.)."""
    r = bordereau_service.update_etat(bordereau_id, p)
    if not r.success:
        code = 404 if "introuvable" in (r.error or "") else 400
        raise HTTPException(status_code=code, detail=r.error)
    return r


@router.delete("/{bordereau_id}", response_model=ToolResult,
               summary="Supprimer un bordereau")
def delete_bordereau(bordereau_id: str) -> ToolResult:
    """Supprime un bordereau. Les bordereaux validés ne peuvent pas être supprimés."""
    r = bordereau_service.delete_bordereau(bordereau_id)
    if not r.success:
        code = 404 if "introuvable" in (r.error or "") else 400
        raise HTTPException(status_code=code, detail=r.error)
    return r