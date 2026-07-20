# mcp_server/server.py
#
# RÔLE : Serveur MCP réel utilisant FastMCP.
# Expose tous les outils DWEXO (transactions + bordereaux)
# via le protocole MCP standard.
#
# Lancer : python mcp_server/server.py

import os
import httpx
from datetime import date
from mcp.server.fastmcp import FastMCP

# Créer le serveur MCP
mcp = FastMCP("DWEXO Finance Assistant")

# URL du serveur MCP HTTP (pas l'API agent)
MCP_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8001")
MCP_KEY = os.getenv("MCP_API_KEY", "dev-secret-key")
API_BASE = f"{MCP_URL.rstrip('/')}/tools"
HEADERS = {"X-API-Key": MCP_KEY}

# ============================================================
# OUTILS TRANSACTIONS
# ============================================================

@mcp.tool()
async def get_transactions(
    type_transaction: str = None,
    etat: str = None,
    caisse_id: str = None,
    date_debut: str = None,
    date_fin: str = None,
    page: int = 1,
    page_size: int = 20
):
    """
    Retourne la liste des transactions DWEXO avec filtres optionnels.
    type_transaction : debit, credit, transfert
    etat : Payé, En attente, Annulé
    caisse_id : caisse-001 (TND), caisse-002 (EUR), caisse-003 (principale)
    """
    params = {"page": page, "page_size": page_size}
    if type_transaction: params["type_transaction"] = type_transaction
    if etat:             params["etat"]             = etat
    if caisse_id:        params["caisse_id"]        = caisse_id
    if date_debut:       params["date_debut"]       = date_debut
    if date_fin:         params["date_fin"]         = date_fin

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/transactions/list",
            json=params,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def get_transaction(transaction_id: str):
    """
    Retourne le détail complet d'une transaction par son ID.
    transaction_id : ex: trx-001, TRX-2026-0001
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_BASE}/transactions/{transaction_id}",
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def create_debit(
    caisse_id: str,
    montant: float,
    devise: str = "TND",
    mode_paiement: str = "Espèce",
    date_reglement: str = None,
    etat: str = "Payé",
    fournisseur_nom: str = None,
    facture_id: str = None,
    categorie_depense: str = None,
    note: str = None
):
    """
    Crée une transaction DÉBIT dans DWEXO (argent qui sort).
    Utiliser quand : payer, régler, fournisseur, dépense, débiter.
    caisse_id : caisse-001 (TND), caisse-002 (EUR), caisse-003 (principale)
    montant : montant positif > 0
    devise : TND (défaut), EUR, USD
    """
    if not date_reglement:
        date_reglement = date.today().isoformat()

    payload = {
        "source_destination": "Caisse",
        "caisse_id":          caisse_id,
        "montant":            montant,
        "devise":             devise,
        "mode_paiement":      mode_paiement,
        "date_reglement":     date_reglement,
        "etat":               etat,
    }
    if fournisseur_nom:    payload["fournisseur_nom"]    = fournisseur_nom
    if facture_id:         payload["facture_id"]         = facture_id
    if categorie_depense:  payload["categorie_depense"]  = categorie_depense
    if note:               payload["note"]               = note

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/transactions/debit",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def create_credit(
    caisse_id: str,
    montant: float,
    devise: str = "TND",
    mode_paiement: str = "Espèce",
    date_reglement: str = None,
    etat: str = "Payé",
    client_nom: str = None,
    client_id: str = None,
    facture_id: str = None,
    rib: str = None,
    note: str = None
):
    """
    Crée une transaction CRÉDIT dans DWEXO (argent qui entre).
    Utiliser quand : encaisser, recevoir, client paie, règlement.
    caisse_id : caisse-001 (TND), caisse-002 (EUR)
    """
    if not date_reglement:
        date_reglement = date.today().isoformat()

    payload = {
        "source_destination": "Caisse",
        "caisse_id":          caisse_id,
        "montant":            montant,
        "devise":             devise,
        "mode_paiement":      mode_paiement,
        "date_reglement":     date_reglement,
        "etat":               etat,
    }
    if client_nom:  payload["client_nom"]  = client_nom
    if client_id:   payload["client_id"]   = client_id
    if facture_id:  payload["facture_id"]  = facture_id
    if rib:         payload["rib"]         = rib
    if note:        payload["note"]        = note

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/transactions/credit",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def create_transfert(
    source_id: str,
    destination_id: str,
    montant: float,
    devise: str = "TND",
    date_transfert: str = None,
    note: str = None
):
    """
    Crée un transfert entre deux caisses DWEXO.
    Utiliser quand : transférer, virer, de caisse X vers Y.
    source_id      : caisse-001, caisse-002, caisse-003
    destination_id : caisse-001, caisse-002, caisse-003
    """
    if not date_transfert:
        date_transfert = date.today().isoformat()

    payload = {
        "source_id":      source_id,
        "destination_id": destination_id,
        "montant":        montant,
        "devise":         devise,
        "date_transfert": date_transfert,
    }
    if note: payload["note"] = note

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/transactions/transfert",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def get_caisses():
    """
    Retourne la liste des caisses DWEXO avec leurs soldes.
    Utiliser quand : solde, caisse, combien d'argent disponible.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_BASE}/transactions/caisses/list",
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


# ============================================================
# OUTILS BORDEREAUX
# ============================================================

@mcp.tool()
async def get_bordereaux(
    reference: str = None,
    etat_global: str = None,
    etat_transactions: str = None,
    type_bordereau: str = None,
    date_remise_debut: str = None,
    date_remise_fin: str = None,
    page: int = 1,
    page_size: int = 10
):
    """
    Retourne la liste des bordereaux DWEXO avec filtres.
    etat_global       : En attente, Validé, Annulé, En cours
    etat_transactions : En attente, Payé, Rejeté, En erreur, Partiel
    type_bordereau    : Chèque, Espèce, Virement, Carte, LCR
    reference         : recherche par référence (ex: BRD-2026-0001)
    """
    params = {"page": page, "page_size": page_size}
    if reference:          params["reference"]          = reference
    if etat_global:        params["etat_global"]        = etat_global
    if etat_transactions:  params["etat_transactions"]  = etat_transactions
    if type_bordereau:     params["type_bordereau"]     = type_bordereau
    if date_remise_debut:  params["date_remise_debut"]  = date_remise_debut
    if date_remise_fin:    params["date_remise_fin"]    = date_remise_fin

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/bordereaux/list",
            json=params,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def get_bordereau(bordereau_id: str):
    """
    Retourne le détail d'un bordereau par son ID ou sa référence.
    bordereau_id : ex: brd-001 ou BRD-2026-0001
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_BASE}/bordereaux/{bordereau_id}",
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def create_bordereau(
    type_bordereau: str,
    montant_total: float,
    date_remise: str = None,
    reference: str = None,
    note: str = None
):
    """
    Crée un nouveau bordereau DWEXO.
    Correspond au bouton '+ AJOUTER' dans l'interface.
    type_bordereau : Chèque, Espèce, Virement, Carte, LCR
    montant_total  : montant total du bordereau
    date_remise    : date de remise (défaut: aujourd'hui)
    """
    if not date_remise:
        date_remise = date.today().isoformat()

    payload = {
        "type_bordereau": type_bordereau,
        "montant_total":  montant_total,
        "date_remise":    date_remise,
        "etat_global":    "En attente",
        "etat_transactions": "En attente",
    }
    if reference: payload["reference"] = reference
    if note:      payload["note"]      = note

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE}/bordereaux/create",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def valider_bordereau(bordereau_id: str, raison: str = None):
    """
    Valide un bordereau DWEXO (passe l'état global à 'Validé').
    bordereau_id : ID ou référence du bordereau
    """
    payload = {"etat_global": "Validé"}
    if raison: payload["raison"] = raison

    async with httpx.AsyncClient() as client:
        response = await client.patch(
            f"{API_BASE}/bordereaux/{bordereau_id}/etat",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def annuler_bordereau(bordereau_id: str, raison: str = None):
    """
    Annule un bordereau DWEXO (passe l'état global à 'Annulé').
    bordereau_id : ID ou référence du bordereau
    """
    payload = {"etat_global": "Annulé"}
    if raison: payload["raison"] = raison

    async with httpx.AsyncClient() as client:
        response = await client.patch(
            f"{API_BASE}/bordereaux/{bordereau_id}/etat",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def supprimer_bordereau(bordereau_id: str):
    """
    Supprime un bordereau DWEXO.
    Attention : les bordereaux validés ne peuvent pas être supprimés.
    bordereau_id : ID ou référence du bordereau
    """
    async with httpx.AsyncClient() as client:
        response = await client.delete(
            f"{API_BASE}/bordereaux/{bordereau_id}",
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


@mcp.tool()
async def modifier_bordereau(
    bordereau_id: str,
    type_bordereau: str = None,
    montant_total: float = None,
    date_remise: str = None,
    note: str = None
):
    """
    Modifie un bordereau DWEXO existant.
    bordereau_id   : ID ou référence du bordereau
    type_bordereau : Chèque, Espèce, Virement, Carte, LCR
    """
    payload = {}
    if type_bordereau: payload["type_bordereau"] = type_bordereau
    if montant_total:  payload["montant_total"]  = montant_total
    if date_remise:    payload["date_remise"]    = date_remise
    if note:           payload["note"]           = note

    async with httpx.AsyncClient() as client:
        response = await client.patch(
            f"{API_BASE}/bordereaux/{bordereau_id}",
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()


# ============================================================
# LANCEMENT
# ============================================================
if __name__ == "__main__":
    mcp.run()