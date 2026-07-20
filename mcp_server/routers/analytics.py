# mcp_server/routers/analytics.py

from fastapi import APIRouter, Security
from mcp_server.schemas.analytics_schemas import AnalyticsFilter
from mcp_server.schemas.common import ToolResult
from mcp_server.services.analytics_service import analytics_service
from mcp_server.middleware.auth import verify_api_key

router = APIRouter(tags=["Tableau de bord"], dependencies=[Security(verify_api_key)])


@router.get("/dashboard", response_model=ToolResult, summary="Tableau de bord finance")
def get_dashboard(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_dashboard(AnalyticsFilter(annee=annee, devise=devise))


@router.get("/forecast", response_model=ToolResult, summary="Prévision financière")
def get_forecast(annee: int = 2026, devise: str = "TND", mois: int | None = None) -> ToolResult:
    return analytics_service.get_forecast(AnalyticsFilter(annee=annee, devise=devise, mois=mois))


@router.get("/paiement-vente", response_model=ToolResult, summary="État paiement vente")
def get_paiement_vente(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_paiement_vente(AnalyticsFilter(annee=annee, devise=devise))


@router.get("/paiement-achat", response_model=ToolResult, summary="État paiement achat")
def get_paiement_achat(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_paiement_achat(AnalyticsFilter(annee=annee, devise=devise))


@router.get("/depenses-categories", response_model=ToolResult,
            summary="Dépenses par catégorie (TOP 10)")
def get_depenses_categories(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_depenses_categories(AnalyticsFilter(annee=annee, devise=devise))


@router.get("/reglement-clients", response_model=ToolResult, summary="Règlement clients")
def get_reglement_clients(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_reglement_clients(AnalyticsFilter(annee=annee, devise=devise))


@router.get("/reglement-fournisseurs", response_model=ToolResult,
            summary="Règlement fournisseurs")
def get_reglement_fournisseurs(annee: int = 2026, devise: str = "TND") -> ToolResult:
    return analytics_service.get_reglement_fournisseurs(AnalyticsFilter(annee=annee, devise=devise))
