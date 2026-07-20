# mcp_server/services/analytics_service.py
# Logique métier Tableau de bord + Prévision financière DWEXO

from mcp_server.schemas.analytics_schemas import AnalyticsFilter
from mcp_server.schemas.common import ToolResult
from mcp_server.services.dwexo_api_client import call_dwexo_sync

_MOIS = [f"{i:02d}" for i in range(1, 13)]
_MOIS_LABELS = ["01-Jan.", "02-Fév.", "03-Mar.", "04-Avr.", "05-Mai.", "06-Juin.",
               "07-Juil.", "08-Août", "09-Sep.", "10-Oct.", "11-Nov.", "12-Déc."]


def _forecast_mock(annee: int, devise: str) -> dict:
    credit_mensuel = {m: 0.0 for m in _MOIS}
    debit_mensuel = {m: 0.0 for m in _MOIS}
    credit_mensuel["07"] = 10000.0

    somme_mensuelle = {}
    for m in _MOIS:
        somme_mensuelle[m] = credit_mensuel[m] - debit_mensuel[m]
        if int(m) >= 7:
            somme_mensuelle[m] = 10000.0

    return {
        "annee": annee,
        "devise": devise,
        "titre": f"FORECAST {annee}",
        "transactions_en_cours_paye": {
            "credit": {lbl: credit_mensuel[_MOIS[i]] for i, lbl in enumerate(_MOIS_LABELS)},
            "debit": {lbl: debit_mensuel[_MOIS[i]] for i, lbl in enumerate(_MOIS_LABELS)},
            "somme": {lbl: somme_mensuelle[_MOIS[i]] for i, lbl in enumerate(_MOIS_LABELS)},
            "total_credit": sum(credit_mensuel.values()),
            "total_debit": sum(debit_mensuel.values()),
            "total_somme": sum(somme_mensuelle.values()),
        },
        "mouvements_entree_sortie": {
            "entree": {lbl: 0.0 for lbl in _MOIS_LABELS},
            "sortie": {lbl: 0.0 for lbl in _MOIS_LABELS},
            "somme": {lbl: 0.0 for lbl in _MOIS_LABELS},
        },
        "tva": {
            "achat": {lbl: 0.0 for lbl in _MOIS_LABELS},
            "vente": {lbl: 0.0 for lbl in _MOIS_LABELS},
            "somme": {lbl: 0.0 for lbl in _MOIS_LABELS},
        },
        "total_credit": sum(credit_mensuel.values()),
        "total_debit": sum(debit_mensuel.values()),
    }


class AnalyticsService:

    def _filter(self, f: AnalyticsFilter) -> dict:
        return {"annee": f.annee, "devise": f.devise, "mois": f.mois}

    def get_dashboard(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/dashboard", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)

        return ToolResult(
            success=True,
            data={
                "annee": f.annee,
                "devise": f.devise,
                "total_caisses": 10000.0,
                "total_banques": 0.0,
                "etat_paiement_vente": {"montant": 0.0, "pourcentage": 0},
                "etat_paiement_achat": {"montant": 0.0, "pourcentage": 0},
                "cheques": [],
                "traites": [],
            },
            total=1,
        )

    def get_forecast(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/forecast", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(success=True, data=_forecast_mock(f.annee, f.devise), total=1)

    def get_paiement_vente(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/paiement-vente", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(
            success=True,
            data={"annee": f.annee, "devise": f.devise, "montant": 0.0, "pourcentage": 0},
            total=1,
        )

    def get_paiement_achat(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/paiement-achat", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(
            success=True,
            data={"annee": f.annee, "devise": f.devise, "montant": 0.0, "pourcentage": 0},
            total=1,
        )

    def get_depenses_categories(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/depenses-categories", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(
            success=True,
            data={"annee": f.annee, "devise": f.devise, "categories": [], "top_10": []},
            total=0,
        )

    def get_reglement_clients(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/reglement-clients", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(
            success=True,
            data={"annee": f.annee, "devise": f.devise, "donnees": [], "message": "Tableau croisé disponible"},
            total=0,
        )

    def get_reglement_fournisseurs(self, f: AnalyticsFilter) -> ToolResult:
        live = call_dwexo_sync("GET", "/finance/analytics/reglement-fournisseurs", params=self._filter(f))
        if live is not None:
            return ToolResult(success=True, data=live, total=1)
        return ToolResult(
            success=True,
            data={"annee": f.annee, "devise": f.devise, "donnees": [], "message": "Tableau croisé disponible"},
            total=0,
        )


analytics_service = AnalyticsService()
