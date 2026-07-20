# mcp_server/services/bordereau_service.py
#
# Logique métier des bordereaux DWEXO.
# En dev : données mockées.
# En prod : remplacer les méthodes par des appels HTTP vers l'API DWEXO réelle.

import uuid
from datetime import datetime, date
from math import ceil
from mcp_server.schemas.bordereau_schemas import (
    BordereauCreate, BordereauFilter, BordereauUpdate,
    BordereauEtatUpdate, EtatGlobal, TypeBordereau
)
from mcp_server.schemas.common import ToolResult, PaginatedResponse


# ── Base de données mock ─────────────────────────────────────────────────
_DB: dict[str, dict] = {
    "brd-001": {
        "id": "brd-001",
        "reference": "BRD-2026-0001",
        "date_remise": "2026-05-07",
        "etat_global": "Validé",
        "etat_transactions": "Payé",
        "montant_total": 5000.0,
        "type_bordereau": "Chèque",
        "note": "Remise chèques clients mai",
        "transaction_ids": ["trx-001", "trx-002"],
        "created_at": "2026-05-07T09:00:00",
        "updated_at": "2026-05-07T09:00:00",
    },
    "brd-002": {
        "id": "brd-002",
        "reference": "BRD-2026-0002",
        "date_remise": "2026-05-15",
        "etat_global": "En attente",
        "etat_transactions": "En attente",
        "montant_total": 3200.0,
        "type_bordereau": "Virement",
        "note": None,
        "transaction_ids": ["trx-003"],
        "created_at": "2026-05-15T10:00:00",
        "updated_at": "2026-05-15T10:00:00",
    },
    "brd-003": {
        "id": "brd-003",
        "reference": "BRD-2026-0003",
        "date_remise": "2026-06-01",
        "etat_global": "En cours",
        "etat_transactions": "Partiel",
        "montant_total": 8750.5,
        "type_bordereau": "Espèce",
        "note": "Versement espèces juin",
        "transaction_ids": ["trx-004", "trx-005", "trx-006"],
        "created_at": "2026-06-01T08:00:00",
        "updated_at": "2026-06-01T08:00:00",
    },
    "brd-004": {
        "id": "brd-004",
        "reference": "BRD-2026-0004",
        "date_remise": "2026-06-15",
        "etat_global": "Annulé",
        "etat_transactions": "Rejeté",
        "montant_total": 1500.0,
        "type_bordereau": "Chèque",
        "note": "Annulé — chèques sans provision",
        "transaction_ids": [],
        "created_at": "2026-06-15T11:00:00",
        "updated_at": "2026-06-16T09:00:00",
    },
}
_COUNTER = len(_DB) + 1


class BordereauService:

    def _find(self, bordereau_id: str) -> tuple[str, dict] | tuple[None, None]:
        """Cherche un bordereau par ID ou référence. Retourne (clé_db, bordereau)."""
        b = _DB.get(bordereau_id)
        if b:
            return bordereau_id, b
        for key, v in _DB.items():
            if v["reference"].lower() == bordereau_id.lower():
                return key, v
        return None, None

    # ── Lister les bordereaux ─────────────────────────────────────────────
    def list_bordereaux(self, f: BordereauFilter) -> ToolResult:
        try:
            items = list(_DB.values())
            filtered = []

            for b in items:
                # Recherche par référence
                if f.reference and f.reference.lower() not in b["reference"].lower():
                    continue
                # Filtre état global
                if f.etat_global and b["etat_global"] != f.etat_global.value:
                    continue
                # Filtre état transactions
                if f.etat_transactions and b["etat_transactions"] != f.etat_transactions.value:
                    continue
                # Filtre type
                if f.type_bordereau and b["type_bordereau"] != f.type_bordereau.value:
                    continue
                # Filtre date début
                if f.date_remise_debut:
                    bd = date.fromisoformat(b["date_remise"])
                    if bd < f.date_remise_debut:
                        continue
                # Filtre date fin
                if f.date_remise_fin:
                    bd = date.fromisoformat(b["date_remise"])
                    if bd > f.date_remise_fin:
                        continue
                # Filtre montant
                if f.montant_min and b["montant_total"] < f.montant_min:
                    continue
                if f.montant_max and b["montant_total"] > f.montant_max:
                    continue

                filtered.append(b)

            # Tri par date décroissante
            filtered.sort(key=lambda x: x["created_at"], reverse=True)

            total  = len(filtered)
            pages  = ceil(total / f.page_size) if total else 1
            start  = (f.page - 1) * f.page_size
            paged  = filtered[start:start + f.page_size]

            return ToolResult(
                success=True,
                data=PaginatedResponse(
                    items=paged, total=total,
                    page=f.page, page_size=f.page_size, pages=pages
                ).model_dump(),
                total=total
            )
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    # ── Récupérer un bordereau par ID ou référence ────────────────────────
    def get_bordereau(self, bordereau_id: str) -> ToolResult:
        _, b = self._find(bordereau_id)
        if not b:
            return ToolResult(success=False, error=f"Bordereau '{bordereau_id}' introuvable")
        return ToolResult(success=True, data=b, total=1)

    # ── Créer un bordereau ────────────────────────────────────────────────
    def create_bordereau(self, p: BordereauCreate) -> ToolResult:
        global _COUNTER
        try:
            new_id  = f"brd-{str(uuid.uuid4())[:8]}"
            ref     = p.reference or f"BRD-{date.today().year}-{str(_COUNTER).zfill(4)}"
            _COUNTER += 1
            now     = datetime.now().isoformat()

            b = {
                "id":                new_id,
                "reference":         ref,
                "date_remise":       p.date_remise.isoformat(),
                "etat_global":       p.etat_global.value,
                "etat_transactions": p.etat_transactions.value,
                "montant_total":     p.montant_total,
                "type_bordereau":    p.type_bordereau.value,
                "note":              p.note,
                "transaction_ids":   p.transaction_ids or [],
                "created_at":        now,
                "updated_at":        now,
            }
            _DB[new_id] = b
            return ToolResult(success=True, data=b, total=1)
        except Exception as e:
            return ToolResult(success=False, error=str(e))

    # ── Modifier un bordereau ─────────────────────────────────────────────
    def update_bordereau(self, bordereau_id: str, p: BordereauUpdate) -> ToolResult:
        key, b = self._find(bordereau_id)
        if not b:
            return ToolResult(success=False, error=f"Bordereau '{bordereau_id}' introuvable")

        # Règle : bordereau annulé non modifiable
        if b["etat_global"] == EtatGlobal.ANNULE.value:
            return ToolResult(success=False, error="Impossible de modifier un bordereau annulé")

        if p.type_bordereau:    b["type_bordereau"]    = p.type_bordereau.value
        if p.date_remise:       b["date_remise"]       = p.date_remise.isoformat()
        if p.montant_total:     b["montant_total"]     = p.montant_total
        if p.etat_global:       b["etat_global"]       = p.etat_global.value
        if p.etat_transactions: b["etat_transactions"] = p.etat_transactions.value
        if p.note is not None:  b["note"]              = p.note
        b["updated_at"] = datetime.now().isoformat()

        return ToolResult(success=True, data=b, total=1)

    # ── Valider / Annuler un bordereau ────────────────────────────────────
    def update_etat(self, bordereau_id: str, p: BordereauEtatUpdate) -> ToolResult:
        key, b = self._find(bordereau_id)
        if not b:
            return ToolResult(success=False, error=f"Bordereau '{bordereau_id}' introuvable")
        if b["etat_global"] == EtatGlobal.ANNULE.value:
            return ToolResult(success=False, error="Bordereau déjà annulé")

        old_etat         = b["etat_global"]
        b["etat_global"] = p.etat_global.value
        b["updated_at"]  = datetime.now().isoformat()

        return ToolResult(success=True, data={
            "bordereau_id": key,
            "reference":    b["reference"],
            "ancien_etat":  old_etat,
            "nouvel_etat":  p.etat_global.value,
            "updated_at":   b["updated_at"],
        }, total=1)

    # ── Supprimer un bordereau ────────────────────────────────────────────
    def delete_bordereau(self, bordereau_id: str) -> ToolResult:
        key, b = self._find(bordereau_id)
        if not b:
            return ToolResult(success=False, error=f"Bordereau '{bordereau_id}' introuvable")
        if b["etat_global"] == EtatGlobal.VALIDE.value:
            return ToolResult(success=False, error="Impossible de supprimer un bordereau validé")

        del _DB[key]
        return ToolResult(success=True, data={"deleted": True, "reference": b["reference"]}, total=1)


bordereau_service = BordereauService()