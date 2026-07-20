# mcp_server/schemas/settings_schemas.py
# Modèles Paramètres DWEXO : Banques, Caisses, Catégories de dépenses

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class Devise(str, Enum):
    TND = "TND"
    EUR = "EUR"
    USD = "USD"


class BankSettingCreate(BaseModel):
    banque: str = Field(..., description="Nom de la banque")
    rib: Optional[str] = None
    iban: Optional[str] = None
    bic: Optional[str] = None
    devise: Devise = Devise.TND


class BankSettingUpdate(BaseModel):
    banque: Optional[str] = None
    rib: Optional[str] = None
    iban: Optional[str] = None
    bic: Optional[str] = None
    devise: Optional[Devise] = None


class FundSettingCreate(BaseModel):
    nom: str
    responsable: Optional[str] = None
    type_caisse: str = "GENERAL"
    statut: str = "OPEN"
    parent: Optional[str] = None


class FundSettingUpdate(BaseModel):
    nom: Optional[str] = None
    responsable: Optional[str] = None
    type_caisse: Optional[str] = None
    statut: Optional[str] = None
    parent: Optional[str] = None


class ExpenseCategoryCreate(BaseModel):
    nom: str
    description: Optional[str] = None


class SettingsSearchFilter(BaseModel):
    recherche: Optional[str] = Field(None, description="Recherche rapide")
