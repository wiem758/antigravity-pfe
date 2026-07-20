# mcp_server/schemas/bilan_schemas.py
# Modèles calqués sur la page Bilan DWEXO (filtres + tableau résumé + transactions)

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum


class EtatTransaction(str, Enum):
    TOUS = "Tous"
    PAYE = "Payé"
    EN_COURS = "En cours"
    D_ENCAISSEMENT = "D. Encaissement"
    D_ESCOMPTE = "D. Escompte"
    ANNULE = "Annulé"
    ECHOUE = "Échoué"


class ModePaiement(str, Enum):
    ESPECE = "Espèce"
    CHEQUE = "Chèque"
    VIREMENT = "Virement"
    TRAITE = "Traite"
    CARTE = "Carte"


class BilanFilter(BaseModel):
    """Filtres de la page Bilan DWEXO."""
    caisse_id: Optional[str] = None
    compte_bancaire_id: Optional[str] = None
    mode_paiement: Optional[ModePaiement] = None
    type_transaction: Optional[str] = Field(None, description="debit, credit, transfert")
    etat: Optional[EtatTransaction] = None
    client_fournisseur: Optional[str] = None
    facture_id: Optional[str] = None
    equipement_id: Optional[str] = None
    employe_id: Optional[str] = None
    categorie_depense: Optional[str] = None
    date_reglement_debut: Optional[date] = None
    date_reglement_fin: Optional[date] = None
    recherche: Optional[str] = Field(None, description="Recherche rapide")
    devise: str = "TND"
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)


class BilanExportRequest(BilanFilter):
    format: str = Field("pdf", description="pdf ou xls")
