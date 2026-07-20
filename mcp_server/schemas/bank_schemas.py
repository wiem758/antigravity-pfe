# mcp_server/schemas/bank_schemas.py
# Modèles calqués sur Comptes bancaires DWEXO

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class Devise(str, Enum):
    TND = "TND"
    EUR = "EUR"
    USD = "USD"


class BankAccountFilter(BaseModel):
    nom: Optional[str] = Field(None, description="Recherche par nom")
    devise: Optional[Devise] = None


class BankAccountCreate(BaseModel):
    nom: str = Field(..., description="Nom du compte bancaire")
    rib: Optional[str] = None
    iban: Optional[str] = None
    bic: Optional[str] = None
    devise: Devise = Devise.TND


class BankAccountUpdate(BaseModel):
    nom: Optional[str] = None
    rib: Optional[str] = None
    iban: Optional[str] = None
    bic: Optional[str] = None
    devise: Optional[Devise] = None
