# mcp_server/services/transaction_service.py
#
# Logique métier des transactions DWEXO.
# En dev : données mockées (reproduit les transactions visibles dans vos captures).
# En prod : remplacer les méthodes par des appels httpx vers l'API DWEXO réelle.

import uuid
from datetime import datetime, date
from math import ceil

from mcp_server.schemas.transaction_schemas import (
    TransactionDebitCreate, TransactionCreditCreate,
    TransactionTransfertCreate, TransactionFilter,
    TransactionType, TransactionEtat, DeviseType,
)
from mcp_server.schemas.common import ToolResult, PaginatedResponse


# ── Données mock ────────────────────────────────────────────
_CAISSES = {
    "caisse-001": {"id":"caisse-001","nom":"Caisse Espèce TND","devise":"TND","solde":10000.0},
    "caisse-002": {"id":"caisse-002","nom":"Caisse Espèce EUR","devise":"EUR","solde":5000.0},
    "caisse-003": {"id":"caisse-003","nom":"Caisse Principale","devise":"TND","solde":25000.0},
}

_COMPTES = {
    "compte-001": {"id":"compte-001","nom":"Compte STB TND","devise":"TND"},
    "compte-002": {"id":"compte-002","nom":"Compte BNA EUR","devise":"EUR"},
}

# Transactions initiales (reprises de vos captures)
_DB: dict[str, dict] = {
    "trx-001": {"id":"trx-001","numero":"TRX-2026-0001","type_transaction":"credit",
                "montant":1000.0,"devise":"TND","date_reglement":"2026-05-07",
                "etat":"Payé","mode_paiement":"Espèce","source_destination":"Caisse",
                "caisse_id":"caisse-001","caisse_nom":"Caisse Espèce TND",
                "client_nom":"Dupont SA","facture_id":"FAC-2026-001",
                "fournisseur_nom":None,"source_id":None,"destination_id":None,
                "note":None,"created_at":"2026-05-07T09:00:00","updated_at":"2026-05-07T09:00:00"},
    "trx-002": {"id":"trx-002","numero":"TRX-2026-0002","type_transaction":"credit",
                "montant":2000.0,"devise":"TND","date_reglement":"2026-05-07",
                "etat":"Payé","mode_paiement":"Espèce","source_destination":"Caisse",
                "caisse_id":"caisse-001","caisse_nom":"Caisse Espèce TND",
                "client_nom":"Martin SRL","facture_id":"FAC-2026-002",
                "fournisseur_nom":None,"source_id":None,"destination_id":None,
                "note":None,"created_at":"2026-05-07T10:00:00","updated_at":"2026-05-07T10:00:00"},
    "trx-003": {"id":"trx-003","numero":"TRX-2026-0003","type_transaction":"debit",
                "montant":1997.0,"devise":"EUR","date_reglement":"2026-05-07",
                "etat":"Payé","mode_paiement":"Espèce","source_destination":"Caisse",
                "caisse_id":"caisse-002","caisse_nom":"Caisse Espèce EUR",
                "fournisseur_nom":"Fournisseur Paris","facture_id":"FAC-ACH-001",
                "client_nom":None,"source_id":None,"destination_id":None,
                "note":"Achat matériel","created_at":"2026-05-07T11:00:00","updated_at":"2026-05-07T11:00:00"},
    "trx-004": {"id":"trx-004","numero":"TRX-2026-0004","type_transaction":"credit",
                "montant":3006.0,"devise":"TND","date_reglement":"2026-05-07",
                "etat":"Payé","mode_paiement":"Espèce","source_destination":"Caisse",
                "caisse_id":"caisse-001","caisse_nom":"Caisse Espèce TND",
                "client_nom":"Ben Ali Industries","facture_id":"FAC-2026-003",
                "fournisseur_nom":None,"source_id":None,"destination_id":None,
                "note":None,"created_at":"2026-05-07T14:00:00","updated_at":"2026-05-07T14:00:00"},
}
_COUNTER = len(_DB) + 1


class TransactionService:

    # ── Débit ────────────────────────────────────────────
    def create_debit(self, p: TransactionDebitCreate) -> ToolResult:
        global _COUNTER
        try:
            caisse_nom = None
            if p.caisse_id:
                c = _CAISSES.get(p.caisse_id)
                if not c:
                    return ToolResult(success=False, error=f"Caisse '{p.caisse_id}' introuvable")
                if c["solde"] < p.montant:
                    return ToolResult(success=False,
                        error=f"Solde insuffisant ({c['solde']} {c['devise']}). Montant demandé : {p.montant}")
                caisse_nom = c["nom"]

            nid    = f"trx-{str(uuid.uuid4())[:8]}"
            numero = f"TRX-{date.today().year}-{str(_COUNTER).zfill(4)}"
            _COUNTER += 1
            now = datetime.now().isoformat()

            tx = {
                "id":nid,"numero":numero,"type_transaction":"debit",
                "montant":p.montant,"devise":p.devise.value,
                "date_reglement":p.date_reglement.isoformat(),
                "etat":p.etat.value,"mode_paiement":p.mode_paiement.value,
                "source_destination":p.source_destination.value,
                "caisse_id":p.caisse_id,"caisse_nom":caisse_nom,
                "fournisseur_id":p.fournisseur_id,"fournisseur_nom":p.fournisseur_nom,
                "facture_id":p.facture_id,"bon_commande":p.bon_commande,
                "equipement_id":p.equipement_id,"categorie_depense":p.categorie_depense,
                "numero_reference":p.numero_reference,"porteur":p.porteur,
                "note":p.note,
                "client_nom":None,"rib":None,"source_id":None,"destination_id":None,
                "source_nom":None,"destination_nom":None,
                "created_at":now,"updated_at":now,
            }
            if p.caisse_id and p.caisse_id in _CAISSES:
                _CAISSES[p.caisse_id]["solde"] -= p.montant
            _DB[nid] = tx
            return ToolResult(success=True, data=tx, total=1)
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    # ── Crédit ───────────────────────────────────────────
    def create_credit(self, p: TransactionCreditCreate) -> ToolResult:
        global _COUNTER
        try:
            caisse_nom = None
            if p.caisse_id:
                c = _CAISSES.get(p.caisse_id)
                if not c:
                    return ToolResult(success=False, error=f"Caisse '{p.caisse_id}' introuvable")
                caisse_nom = c["nom"]

            nid    = f"trx-{str(uuid.uuid4())[:8]}"
            numero = f"TRX-{date.today().year}-{str(_COUNTER).zfill(4)}"
            _COUNTER += 1
            now = datetime.now().isoformat()

            tx = {
                "id":nid,"numero":numero,"type_transaction":"credit",
                "montant":p.montant,"devise":p.devise.value,
                "date_reglement":p.date_reglement.isoformat(),
                "etat":p.etat.value,"mode_paiement":p.mode_paiement.value,
                "source_destination":p.source_destination.value,
                "caisse_id":p.caisse_id,"caisse_nom":caisse_nom,
                "client_id":p.client_id,"client_nom":p.client_nom,"rib":p.rib,
                "facture_id":p.facture_id,"bon_commande":p.bon_commande,
                "categorie_depense":p.categorie_depense,
                "numero_reference":p.numero_reference,"porteur":p.porteur,
                "bordereau_remise":p.bordereau_remise,"note":p.note,
                "fournisseur_nom":None,"source_id":None,"destination_id":None,
                "source_nom":None,"destination_nom":None,
                "created_at":now,"updated_at":now,
            }
            if p.caisse_id and p.caisse_id in _CAISSES:
                _CAISSES[p.caisse_id]["solde"] += p.montant
            _DB[nid] = tx
            return ToolResult(success=True, data=tx, total=1)
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    # ── Transfert ────────────────────────────────────────
    def create_transfert(self, p: TransactionTransfertCreate) -> ToolResult:
        global _COUNTER
        try:
            src  = _CAISSES.get(p.source_id)      or _COMPTES.get(p.source_id)
            dest = _CAISSES.get(p.destination_id) or _COMPTES.get(p.destination_id)

            if not src:  return ToolResult(success=False, error=f"Source '{p.source_id}' introuvable")
            if not dest: return ToolResult(success=False, error=f"Destination '{p.destination_id}' introuvable")

            if p.source_id in _CAISSES and _CAISSES[p.source_id]["solde"] < p.montant:
                return ToolResult(success=False,
                    error=f"Solde insuffisant ({_CAISSES[p.source_id]['solde']} {_CAISSES[p.source_id]['devise']})")

            nid    = f"trx-{str(uuid.uuid4())[:8]}"
            numero = f"TRF-{date.today().year}-{str(_COUNTER).zfill(4)}"
            _COUNTER += 1
            now = datetime.now().isoformat()

            tx = {
                "id":nid,"numero":numero,"type_transaction":"transfert",
                "montant":p.montant,"devise":p.devise.value,
                "date_reglement":p.date_transfert.isoformat(),
                "etat":"Payé","mode_paiement":None,"source_destination":None,
                "caisse_id":None,"caisse_nom":None,
                "source_id":p.source_id,"source_nom":src.get("nom"),
                "destination_id":p.destination_id,"destination_nom":dest.get("nom"),
                "note":p.note,
                "client_nom":None,"fournisseur_nom":None,"facture_id":None,
                "created_at":now,"updated_at":now,
            }
            if p.source_id in _CAISSES:      _CAISSES[p.source_id]["solde"]      -= p.montant
            if p.destination_id in _CAISSES: _CAISSES[p.destination_id]["solde"] += p.montant
            _DB[nid] = tx
            return ToolResult(success=True, data=tx, total=1)
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    # ── Liste ────────────────────────────────────────────
    def list_transactions(self, f: TransactionFilter) -> ToolResult:
        try:
            items = list(_DB.values())
            filtered = []
            for tx in items:
                if f.type_transaction and tx["type_transaction"] != f.type_transaction.value: continue
                if f.caisse_id and tx.get("caisse_id") != f.caisse_id and \
                   tx.get("source_id") != f.caisse_id and tx.get("destination_id") != f.caisse_id: continue
                if f.etat and tx.get("etat") != f.etat.value: continue
                if f.annee:
                    yr = int(tx["date_reglement"][:4])
                    if yr != f.annee: continue
                if f.date_debut:
                    d = date.fromisoformat(tx["date_reglement"][:10])
                    if d < f.date_debut: continue
                if f.date_fin:
                    d = date.fromisoformat(tx["date_reglement"][:10])
                    if d > f.date_fin: continue
                if f.recherche:
                    term = f.recherche.lower()
                    blob = " ".join(filter(None,[tx.get("client_nom",""),tx.get("fournisseur_nom",""),
                                                  tx.get("numero",""),str(tx.get("montant",""))])).lower()
                    if term not in blob: continue
                filtered.append(tx)

            filtered.sort(key=lambda x: x["created_at"], reverse=True)
            total  = len(filtered)
            pages  = ceil(total / f.page_size) if total else 1
            start  = (f.page - 1) * f.page_size
            paged  = filtered[start:start+f.page_size]
            return ToolResult(success=True,
                data=PaginatedResponse(items=paged,total=total,page=f.page,
                                       page_size=f.page_size,pages=pages).model_dump(),
                total=total)
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    def get_transaction(self, tid: str) -> ToolResult:
        tx = _DB.get(tid)
        if not tx: return ToolResult(success=False, error=f"Transaction '{tid}' introuvable")
        return ToolResult(success=True, data=tx, total=1)

    def get_caisses(self) -> ToolResult:
        return ToolResult(success=True, data=list(_CAISSES.values()), total=len(_CAISSES))


transaction_service = TransactionService()