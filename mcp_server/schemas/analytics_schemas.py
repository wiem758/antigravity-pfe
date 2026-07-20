# mcp_server/schemas/analytics_schemas.py
# Modèles calqués sur Tableau de bord + Prévision financière DWEXO

from pydantic import BaseModel, Field
from typing import Optional


class AnalyticsFilter(BaseModel):
    annee: int = Field(2026, ge=2020, le=2030)
    devise: str = "TND"
    mois: Optional[int] = Field(None, ge=1, le=12, description="Mois spécifique pour la prévision")
