# mcp_server/schemas/caisse_schemas.py
# Modèles calqués sur la page Caisses DWEXO (gestion opérationnelle)

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum


class StatutCaisse(str, Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"


class TypeCaisse(str, Enum):
    GENERAL = "GENERAL"
    SECONDAIRE = "SECONDAIRE"


class CaisseMouvementCreate(BaseModel):
    """Débit, crédit ou transfert depuis une caisse."""
    caisse_id: str
    montant: float = Field(..., gt=0)
    devise: str = "TND"
    mode_paiement: str = "Espèce"
    date_reglement: date
    beneficiaire: Optional[str] = None
    type_depense: Optional[str] = None
    note: Optional[str] = None


class CaisseTransactionFilter(BaseModel):
    caisse_id: str
    date_debut: Optional[date] = None
    date_fin: Optional[date] = None
    periode_mois: Optional[int] = Field(None, ge=1, le=12)
    annee: Optional[int] = None
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)
