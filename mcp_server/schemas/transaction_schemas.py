# mcp_server/schemas/transaction_schemas.py
# Modèles Pydantic calqués exactement sur les formulaires DWEXO.

from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional
from enum import Enum
from datetime import date


class TransactionType(str, Enum):
    DEBIT     = "debit"
    CREDIT    = "credit"
    TRANSFERT = "transfert"

class TransactionEtat(str, Enum):
    PAYE       = "Payé"
    EN_ATTENTE = "En attente"
    ANNULE     = "Annulé"

class ModePaiement(str, Enum):
    ESPECE      = "Espèce"
    CHEQUE      = "Chèque"
    VIREMENT    = "Virement bancaire"
    CARTE       = "Carte bancaire"

class DeviseType(str, Enum):
    TND = "TND"
    EUR = "EUR"
    USD = "USD"

class SourceDestination(str, Enum):
    CAISSE          = "Caisse"
    COMPTE_BANCAIRE = "Compte bancaire"


class TransactionBase(BaseModel):
    """Champs communs aux formulaires Débit et Crédit."""
    source_destination:              SourceDestination = SourceDestination.CAISSE
    caisse_id:                       Optional[str]     = None
    compte_bancaire_id:              Optional[str]     = None
    montant:                         float             = Field(..., gt=0)
    mode_paiement:                   ModePaiement      = ModePaiement.ESPECE
    date_reglement:                  date              = Field(...)
    etat:                            TransactionEtat   = TransactionEtat.PAYE
    devise:                          DeviseType        = DeviseType.TND
    numero_reference:                Optional[str]     = None
    porteur:                         Optional[str]     = None
    bordereau_remise:                Optional[str]     = None
    categorie_depense:               Optional[str]     = None
    note:                            Optional[str]     = None
    transaction_plusieurs_factures:  bool              = False

    @model_validator(mode='after')
    def valider_source(self):
        if self.source_destination == SourceDestination.CAISSE and not self.caisse_id:
            raise ValueError("caisse_id obligatoire quand source = Caisse")
        if self.source_destination == SourceDestination.COMPTE_BANCAIRE and not self.compte_bancaire_id:
            raise ValueError("compte_bancaire_id obligatoire quand source = Compte bancaire")
        return self


class TransactionDebitCreate(TransactionBase):
    """Formulaire TRANSACTION[DEBIT] — Image 4."""
    fournisseur_id:  Optional[str] = None
    fournisseur_nom: Optional[str] = None
    facture_id:      Optional[str] = None
    bon_commande:    Optional[str] = None
    equipement_id:   Optional[str] = None


class TransactionCreditCreate(TransactionBase):
    """Formulaire TRANSACTION[CREDIT] — Image 3."""
    client_id:   Optional[str] = None
    client_nom:  Optional[str] = None
    rib:         Optional[str] = None
    facture_id:  Optional[str] = None
    bon_commande:Optional[str] = None


class TransactionTransfertCreate(BaseModel):
    """Formulaire TRANSFERT ENTRE CAISSES/COMPTES — Image 2."""
    source_id:       str            = Field(...)
    source_nom:      Optional[str]  = None
    destination_id:  str            = Field(...)
    destination_nom: Optional[str]  = None
    montant:         float          = Field(..., gt=0)
    devise:          DeviseType     = DeviseType.TND
    date_transfert:  date           = Field(...)
    note:            Optional[str]  = None

    @field_validator('destination_id')
    @classmethod
    def src_diff_dest(cls, v, info):
        if 'source_id' in info.data and v == info.data['source_id']:
            raise ValueError("Source et destination identiques")
        return v


class TransactionFilter(BaseModel):
    """Filtres de la vue liste Transactions — Image 1."""
    recherche:        Optional[str]             = None
    type_transaction: Optional[TransactionType] = None
    caisse_id:        Optional[str]             = None
    compte_bancaire_id: Optional[str]           = None
    annee:            Optional[int]             = None
    date_debut:       Optional[date]            = None
    date_fin:         Optional[date]            = None
    etat:             Optional[TransactionEtat] = None
    page:             int                       = Field(1, ge=1)
    page_size:        int                       = Field(20, ge=1, le=100)