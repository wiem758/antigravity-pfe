# mcp_server/schemas/bordereau_schemas.py
#
# Modèles Pydantic calqués exactement sur la page Bordereaux de DWEXO :
# Référence | Date de remise | État global | État des transactions
# Montant total | Type de bordereau

from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from datetime import date


class EtatGlobal(str, Enum):
    """État global du bordereau — visible dans la colonne 'État global'"""
    EN_ATTENTE = "En attente"
    VALIDE     = "Validé"
    ANNULE     = "Annulé"
    EN_COURS   = "En cours"


class EtatTransactions(str, Enum):
    """État des transactions liées au bordereau"""
    EN_ATTENTE = "En attente"
    PAYE       = "Payé"
    REJETE     = "Rejeté"
    EN_ERREUR  = "En erreur"
    PARTIEL    = "Partiel"


class TypeBordereau(str, Enum):
    """Type de bordereau — colonne 'Type de bordereau'"""
    CHEQUE   = "Chèque"
    ESPECE   = "Espèce"
    VIREMENT = "Virement"
    CARTE    = "Carte"
    LCR      = "LCR"


# ── Création d'un bordereau ──────────────────────────────────────────────
class BordereauCreate(BaseModel):
    """
    Données pour créer un nouveau bordereau.
    Correspond au bouton "+ AJOUTER" dans DWEXO.
    """
    reference:    Optional[str]           = Field(None,  description="Référence du bordereau (auto-générée si vide)")
    date_remise:  date                    = Field(...,   description="Date de remise du bordereau")
    type_bordereau: TypeBordereau         = Field(...,   description="Type : Chèque, Espèce, Virement...")
    montant_total:  float                 = Field(...,   gt=0, description="Montant total du bordereau")
    etat_global:    EtatGlobal            = Field(EtatGlobal.EN_ATTENTE, description="État global")
    etat_transactions: EtatTransactions   = Field(EtatTransactions.EN_ATTENTE, description="État des transactions")
    note:           Optional[str]         = Field(None,  description="Note libre")
    transaction_ids: Optional[List[str]]  = Field(None,  description="IDs des transactions liées")


# ── Filtre pour la recherche ──────────────────────────────────────────────
class BordereauFilter(BaseModel):
    """
    Filtres pour la liste des bordereaux.
    Correspond à la barre de recherche et aux colonnes de DWEXO.
    """
    reference:         Optional[str]              = Field(None, description="Recherche par référence bordereau")
    date_remise_debut: Optional[date]             = Field(None, description="Date de remise à partir de")
    date_remise_fin:   Optional[date]             = Field(None, description="Date de remise jusqu'à")
    etat_global:       Optional[EtatGlobal]       = Field(None, description="Filtrer par état global")
    etat_transactions: Optional[EtatTransactions] = Field(None, description="Filtrer par état des transactions")
    type_bordereau:    Optional[TypeBordereau]    = Field(None, description="Filtrer par type")
    montant_min:       Optional[float]            = Field(None, description="Montant total minimum")
    montant_max:       Optional[float]            = Field(None, description="Montant total maximum")
    page:              int                        = Field(1,    ge=1)
    page_size:         int                        = Field(10,   ge=1, le=100)  # 10 par défaut (visible dans DWEXO)


# ── Mise à jour d'un bordereau ────────────────────────────────────────────
class BordereauUpdate(BaseModel):
    """Données pour modifier un bordereau existant."""
    type_bordereau:    Optional[TypeBordereau]    = None
    date_remise:       Optional[date]             = None
    montant_total:     Optional[float]            = Field(None, gt=0)
    etat_global:       Optional[EtatGlobal]       = None
    etat_transactions: Optional[EtatTransactions] = None
    note:              Optional[str]              = None


# ── Changement d'état ─────────────────────────────────────────────────────
class BordereauEtatUpdate(BaseModel):
    """Pour valider ou annuler un bordereau."""
    etat_global: EtatGlobal  = Field(..., description="Nouvel état global")
    raison:      Optional[str] = Field(None, description="Raison du changement")