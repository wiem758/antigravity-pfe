# agent/services/dwexo_service.py
#
# RÔLE : Logique centrale qui :
#   1. Reçoit l'action et les paramètres détectés par Gemini
#   2. Appelle l'outil MCP correspondant via HTTP
#   3. Construit la réponse finale en langage naturel
#      dans la langue de l'utilisateur
#
# FLUX :
#   Gemini → {"action": "create_debit", "langue": "fr", "params": {...}}
#       ↓
#   dwexo_service.execute(action, params, langue)
#       ↓
#   HTTP → MCP server (port 8001) → API DWEXO
#       ↓
#   Réponse naturelle dans la langue de l'utilisateur

import os
import httpx
from datetime import date
from typing import Optional

MCP_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8001")
MCP_KEY = os.getenv("MCP_API_KEY",    "dev-secret-key")
HEADERS = {"X-API-Key": MCP_KEY, "Content-Type": "application/json"}
TODAY   = date.today().isoformat()


# ════════════════════════════════════════════════════════════════
# TABLE DE ROUTAGE — action Gemini → endpoint MCP
# ════════════════════════════════════════════════════════════════
ROUTES: dict[str, tuple[str, str]] = {

    # ── Transactions ──────────────────────────────────────────
    "create_debit":       ("POST",  "/tools/transactions/debit"),
    "create_credit":      ("POST",  "/tools/transactions/credit"),
    "create_transfert":   ("POST",  "/tools/transactions/transfert"),
    "get_transactions":   ("POST",  "/tools/transactions/list"),
    "get_transaction":    ("GET",   "/tools/transactions/{id}"),
    "get_caisses":        ("GET",   "/tools/transactions/caisses/list"),

    # ── Bordereaux ────────────────────────────────────────────
    "get_bordereaux":     ("POST",  "/tools/bordereaux/list"),
    "get_bordereau":      ("GET",   "/tools/bordereaux/{id}"),
    "create_bordereau":   ("POST",  "/tools/bordereaux/create"),
    "valider_bordereau":  ("PATCH", "/tools/bordereaux/{id}/etat"),
    "annuler_bordereau":  ("PATCH", "/tools/bordereaux/{id}/etat"),
    "modifier_bordereau": ("PATCH", "/tools/bordereaux/{id}"),
    "supprimer_bordereau":("DELETE","/tools/bordereaux/{id}"),

    # ── Bilan ─────────────────────────────────────────────────
    "get_bilan":          ("POST",  "/tools/bilan"),
    "export_bilan_pdf":   ("POST",  "/tools/bilan/export"),
    "export_bilan_excel": ("POST",  "/tools/bilan/export"),

    # ── Caisses ───────────────────────────────────────────────
    "list_caisses":             ("GET",  "/tools/caisses"),
    "get_caisse":               ("GET",  "/tools/caisses/{id}"),
    "get_transactions_caisse":  ("POST", "/tools/transactions/list"),

    # ── Comptes bancaires ─────────────────────────────────────
    "get_comptes_bancaires":    ("GET",  "/tools/banks"),
    "get_compte_bancaire":      ("GET",  "/tools/banks/{id}"),
    "get_solde_compte_bancaire":("GET",  "/tools/banks/{id}/solde"),

    # ── Tableau de bord ───────────────────────────────────────
    "get_tableau_de_bord":        ("GET",  "/tools/analytics/dashboard"),
    "get_prevision_financiere":   ("GET",  "/tools/analytics/forecast"),
    "get_etat_paiement_vente":    ("GET",  "/tools/analytics/paiement-vente"),
    "get_etat_paiement_achat":    ("GET",  "/tools/analytics/paiement-achat"),
    "get_depenses_par_categorie": ("GET",  "/tools/analytics/depenses-categories"),
    "get_reglement_clients":      ("GET",  "/tools/analytics/reglement-clients"),
    "get_reglement_fournisseurs": ("GET",  "/tools/analytics/reglement-fournisseurs"),

    # ── Paramètres ────────────────────────────────────────────
    "get_banques":              ("GET",    "/tools/settings/banks"),
    "create_banque":            ("POST",   "/tools/settings/banks"),
    "modifier_banque":          ("PATCH",  "/tools/settings/banks/{id}"),
    "supprimer_banque":         ("DELETE", "/tools/settings/banks/{id}"),
    "get_params_caisses":       ("GET",    "/tools/settings/funds"),
    "create_params_caisse":     ("POST",   "/tools/settings/funds"),
    "modifier_params_caisse":   ("PATCH",  "/tools/settings/funds/{id}"),
    "supprimer_params_caisse":  ("DELETE", "/tools/settings/funds/{id}"),
    "get_categories_depenses":  ("GET",    "/tools/settings/expense-categories"),
    "create_categorie_depense": ("POST",   "/tools/settings/expense-categories"),
    "supprimer_categorie_depense":("DELETE","/tools/settings/expense-categories/{id}"),
}

# Actions qui créent une transaction (pour extraire transaction_data)
CREATION_TRANSACTIONS = {"create_debit", "create_credit", "create_transfert"}
CREATION_BORDEREAUX   = {"create_bordereau"}

# Alias pour compatibilité chat / anciennes versions
ACTION_ALIASES: dict[str, str] = {
    "list_transactions": "get_transactions",
}


# ════════════════════════════════════════════════════════════════
# EXÉCUTION DE L'ACTION
# ════════════════════════════════════════════════════════════════

async def execute(action: str, params: dict, langue: str) -> dict:
    """
    Exécute l'action détectée par Gemini.
    Retourne : {
        "response"        : texte en langage naturel,
        "transaction_data": données de transaction si créée,
        "raw_data"        : données brutes du MCP,
        "success"         : bool
    }
    """
    action = ACTION_ALIASES.get(action, action)

    if action == "unknown" or action not in ROUTES:
        return {
            "response":         params.get("message_utilisateur", _msg_hors_scope(langue)),
            "transaction_data": None,
            "raw_data":         None,
            "success":          False
        }

    # Appliquer les valeurs par défaut
    params = _apply_defaults(action, params)

    # Appeler le MCP
    mcp_result = await _call_mcp(action, params)

    if not mcp_result:
        return {
            "response":         _msg_erreur_mcp(langue),
            "transaction_data": None,
            "raw_data":         None,
            "success":          False
        }

    # Extraire les données selon le type d'action
    transaction_data = None
    if action in CREATION_TRANSACTIONS and mcp_result.get("success"):
        transaction_data = mcp_result.get("data")

    # Construire la réponse naturelle
    response = _build_response(action, mcp_result, langue, params)

    return {
        "response":         response,
        "transaction_data": transaction_data,
        "raw_data":         mcp_result,
        "success":          mcp_result.get("success", False)
    }


# ════════════════════════════════════════════════════════════════
# APPEL HTTP VERS LE MCP
# ════════════════════════════════════════════════════════════════

async def _call_mcp(action: str, params: dict) -> Optional[dict]:
    """Construit et exécute l'appel HTTP vers le serveur MCP."""

    method, endpoint = ROUTES[action]

    # Remplacer {id} dans l'endpoint par le bon paramètre
    entity_id = (
        params.pop("transaction_id",  None) or
        params.pop("bordereau_id",    None) or
        params.pop("caisse_id_path",  None) or
        params.pop("compte_id",       None) or
        params.pop("banque_id",       None) or
        params.pop("categorie_id",    None)
    )
    if "{id}" in endpoint:
        if not entity_id:
            return {"success": False, "error": "ID manquant pour cette opération"}
        endpoint = endpoint.replace("{id}", str(entity_id))

    # Ajouter le body spécifique pour valider/annuler bordereau
    if action == "valider_bordereau":
        params = {"etat_global": "Validé", **{k: v for k, v in params.items() if k == "raison"}}
    elif action == "annuler_bordereau":
        params = {"etat_global": "Annulé", **{k: v for k, v in params.items() if k == "raison"}}

    try:
        async with httpx.AsyncClient(base_url=MCP_URL, headers=HEADERS, timeout=30) as client:
            if method == "GET":
                resp = await client.get(endpoint, params={k: v for k, v in params.items() if v is not None})
            elif method == "POST":
                resp = await client.post(endpoint, json={k: v for k, v in params.items() if v is not None})
            elif method == "PATCH":
                resp = await client.patch(endpoint, json={k: v for k, v in params.items() if v is not None})
            elif method == "DELETE":
                resp = await client.delete(endpoint)
            else:
                return {"success": False, "error": f"Méthode inconnue : {method}"}

        return resp.json()

    except httpx.ConnectError:
        return {"success": False, "error": "Serveur MCP inaccessible (port 8001)"}
    except Exception as e:
        return {"success": False, "error": str(e)}


# ════════════════════════════════════════════════════════════════
# VALEURS PAR DÉFAUT
# ════════════════════════════════════════════════════════════════

def _apply_defaults(action: str, params: dict) -> dict:
    """Applique les valeurs par défaut selon l'action."""
    p = dict(params)

    # Transactions
    if action in ("create_debit", "create_credit"):
        p.setdefault("source_destination", "Caisse")
        p.setdefault("mode_paiement",      "Espèce")
        p.setdefault("devise",             "TND")
        p.setdefault("etat",               "Payé")
        p.setdefault("date_reglement",     TODAY)
        if not p.get("caisse_id"):
            p["caisse_id"] = "caisse-002" if p.get("devise") == "EUR" else "caisse-001"

    elif action == "create_transfert":
        p.setdefault("devise",          "TND")
        p.setdefault("date_transfert",  TODAY)
        p.setdefault("source_id",       "caisse-001")
        p.setdefault("destination_id",  "caisse-003")

    # Bordereaux
    elif action == "create_bordereau":
        p.setdefault("date_remise",         TODAY)
        p.setdefault("etat_global",         "En attente")
        p.setdefault("etat_transactions",   "En attente")

    # Bilan
    elif action in ("get_bilan", "export_bilan_pdf", "export_bilan_excel"):
        p.setdefault("devise", "TND")
        if action == "export_bilan_pdf":   p["format"] = "pdf"
        if action == "export_bilan_excel": p["format"] = "xls"

    # Tableau de bord
    elif action in ("get_tableau_de_bord", "get_prevision_financiere",
                    "get_etat_paiement_vente", "get_etat_paiement_achat",
                    "get_depenses_par_categorie", "get_reglement_clients",
                    "get_reglement_fournisseurs"):
        p.setdefault("annee",  date.today().year)
        p.setdefault("devise", "TND")

    return p


# ════════════════════════════════════════════════════════════════
# CONSTRUCTION DE LA RÉPONSE NATURELLE
# ════════════════════════════════════════════════════════════════

def _build_response(action: str, result: dict, langue: str, params: dict) -> str:
    """Construit la réponse en langage naturel selon l'action et la langue."""

    if not result.get("success"):
        err = result.get("error", "Erreur inconnue")
        return {
            "fr": f"❌ Erreur : {err}",
            "ar": f"❌ خطأ : {err}",
            "tn": f"❌ غلطة : {err}",
            "en": f"❌ Error: {err}",
        }.get(langue, f"❌ {err}")

    data = result.get("data", {})

    # ── Transactions créées ────────────────────────────────────────────
    if action in CREATION_TRANSACTIONS and isinstance(data, dict):
        return _response_transaction(data, action, langue)

    # ── Liste transactions ─────────────────────────────────────────────
    if action == "get_transactions":
        return _response_list_transactions(data, langue)

    # ── Caisses ───────────────────────────────────────────────────────
    if action in ("get_caisses", "list_caisses"):
        return _response_caisses(data, langue)

    if action == "get_caisse" and isinstance(data, dict):
        nom = data.get("nom", "N/A")
        solde = _fmt(data.get("solde", 0))
        dev = data.get("devise", "TND")
        statut = data.get("statut", "")
        if langue == "en":
            return f"💼 Cash register {nom}:\n• Status: {statut}\n• Balance: {solde} {dev}"
        return f"💼 Caisse {nom} :\n• Statut : {statut}\n• Solde : {solde} {dev}"

    # ── Bilan ─────────────────────────────────────────────────────────
    if action == "get_bilan":
        return _response_bilan(data, langue)

    # ── Bordereaux liste ───────────────────────────────────────────────
    if action == "get_bordereaux":
        return _response_list_bordereaux(data, langue)

    # ── Bordereau détail ───────────────────────────────────────────────
    if action == "get_bordereau" and isinstance(data, dict):
        return _response_bordereau_detail(data, langue)

    # ── Bordereau créé ─────────────────────────────────────────────────
    if action == "create_bordereau" and isinstance(data, dict):
        return _response_bordereau_cree(data, langue)

    # ── Bordereau validé ───────────────────────────────────────────────
    if action == "valider_bordereau" and isinstance(data, dict):
        ref = data.get("reference", "")
        return {"fr": f"✅ Bordereau {ref} validé avec succès !",
                "ar": f"✅ تم التحقق من البوردرو {ref} بنجاح !",
                "tn": f"✅ البوردرو {ref} تصادق عليها !",
                "en": f"✅ Bordereau {ref} validated successfully!"}.get(langue, f"✅ {ref} validé")

    # ── Bordereau annulé ───────────────────────────────────────────────
    if action == "annuler_bordereau" and isinstance(data, dict):
        ref = data.get("reference", "")
        return {"fr": f"✅ Bordereau {ref} annulé.",
                "ar": f"✅ تم إلغاء البوردرو {ref}.",
                "tn": f"✅ البوردرو {ref} تلغات.",
                "en": f"✅ Bordereau {ref} cancelled."}.get(langue, f"✅ {ref} annulé")

    # ── Bordereau supprimé ─────────────────────────────────────────────
    if action == "supprimer_bordereau" and isinstance(data, dict):
        ref = data.get("reference", "")
        return {"fr": f"🗑️ Bordereau {ref} supprimé.",
                "ar": f"🗑️ تم حذف البوردرو {ref}.",
                "tn": f"🗑️ البوردرو {ref} تمسحت.",
                "en": f"🗑️ Bordereau {ref} deleted."}.get(langue, f"🗑️ {ref} supprimé")

    # ── Tableau de bord ────────────────────────────────────────────────
    if action == "get_tableau_de_bord":
        return _response_tableau_bord(data, langue)

    # ── Prévision financière ───────────────────────────────────────────
    if action == "get_prevision_financiere":
        return _response_prevision(data, langue, params.get("annee", date.today().year))

    # ── Comptes bancaires ─────────────────────────────────────────────
    if action in ("get_comptes_bancaires", "get_compte_bancaire"):
        return _response_comptes_bancaires(data, langue)

    # ── Paramètres ────────────────────────────────────────────────────
    if action in ("get_banques", "get_params_caisses", "get_categories_depenses"):
        return _response_parametres(data, action, langue)

    if action in ("create_banque", "create_params_caisse", "create_categorie_depense"):
        return {"fr": "✅ Élément créé avec succès dans les paramètres.",
                "ar": "✅ تم إنشاء العنصر في الإعدادات.",
                "tn": "✅ تعمّل العنصر في الإعدادات.",
                "en": "✅ Item created in settings."}.get(langue, "✅ Créé")

    if action in ("supprimer_banque", "supprimer_params_caisse", "supprimer_categorie_depense"):
        return {"fr": "🗑️ Élément supprimé des paramètres.",
                "ar": "🗑️ تم حذف العنصر من الإعدادات.",
                "tn": "🗑️ العنصر تمسح من الإعدادات.",
                "en": "🗑️ Item deleted from settings."}.get(langue, "🗑️ Supprimé")

    # ── Export ────────────────────────────────────────────────────────
    if action in ("export_bilan_pdf", "export_bilan_excel"):
        fmt = "PDF" if "pdf" in action else "Excel"
        return {"fr": f"📥 Export {fmt} généré avec succès.",
                "ar": f"📥 تم تصدير {fmt} بنجاح.",
                "tn": f"📥 التصدير {fmt} تعمّل.",
                "en": f"📥 {fmt} export generated."}.get(langue, f"📥 Export {fmt}")

    # Réponse générique
    return {"fr": "✅ Opération effectuée avec succès.",
            "ar": "✅ تمت العملية بنجاح.",
            "tn": "✅ تسجّلت العملية.",
            "en": "✅ Operation completed."}.get(langue, "✅ OK")


# ════════════════════════════════════════════════════════════════
# HELPERS DE RÉPONSE
# ════════════════════════════════════════════════════════════════

def _fmt(montant: float) -> str:
    """Formate un montant avec 3 décimales."""
    return f"{montant:,.3f}".replace(",", " ")


def _response_transaction(d: dict, action: str, langue: str) -> str:
    num  = d.get("numero", "N/A")
    mnt  = _fmt(d.get("montant", 0))
    dev  = d.get("devise", "TND")
    eta  = d.get("etat", "Payé")
    cais = d.get("caisse_nom", "")
    typ  = d.get("type_transaction", "")

    labels = {
        "fr": {"debit": "Débit", "credit": "Crédit", "transfert": "Transfert"},
        "ar": {"debit": "خصم",   "credit": "دائن",   "transfert": "تحويل"},
        "tn": {"debit": "دبيت",  "credit": "كريدي",  "transfert": "تحويل"},
        "en": {"debit": "Debit", "credit": "Credit", "transfert": "Transfer"},
    }
    lbl = labels.get(langue, labels["fr"]).get(typ, typ)

    if langue == "ar":
        return (f"✅ تمت العملية بنجاح !\n"
                f"• النوع : {lbl}\n• الرقم : {num}\n"
                f"• المبلغ : {mnt} {dev}\n• الصندوق : {cais}\n• الحالة : {eta}")
    elif langue == "tn":
        return (f"✅ تسجّلت العملية بالنجاح !\n"
                f"• النوع : {lbl}\n• الرقم : {num}\n"
                f"• المبلغ : {mnt} {dev}\n• الصندوق : {cais}")
    elif langue == "en":
        return (f"✅ Transaction recorded!\n"
                f"• Type   : {lbl}\n• Number : {num}\n"
                f"• Amount : {mnt} {dev}\n• Cash   : {cais}\n• Status : {eta}")
    else:
        return (f"✅ Opération enregistrée avec succès !\n"
                f"• Type    : {lbl}\n• Numéro  : {num}\n"
                f"• Montant : {mnt} {dev}\n• Caisse  : {cais}\n• État    : {eta}")


def _response_list_transactions(data: dict, langue: str) -> str:
    if isinstance(data, dict):
        items = data.get("items", [])
        total = data.get("total", 0)
    else:
        items, total = [], 0

    headers = {"fr": f"📋 {total} transaction(s) trouvée(s) :",
               "ar": f"📋 تم العثور على {total} عملية :",
               "tn": f"📋 لقيت {total} عملية :",
               "en": f"📋 {total} transaction(s) found:"}
    lines = [headers.get(langue, headers["fr"])]
    for t in items[:5]:
        typ = t.get("type_transaction", "").upper()
        lines.append(f"• {t.get('numero','')} | {typ} | "
                     f"{_fmt(t.get('montant',0))} {t.get('devise','')} | {t.get('etat','')}")
    if total > 5:
        more = {"fr": f"… et {total-5} autres", "ar": f"… و {total-5} أخرى",
                "tn": f"… و {total-5} أخرى", "en": f"… and {total-5} more"}
        lines.append(more.get(langue, ""))
    return "\n".join(lines)


def _response_caisses(data, langue: str) -> str:
    caisses = data if isinstance(data, list) else []
    headers = {"fr": "💼 Soldes des caisses :",
               "ar": "💼 أرصدة الصناديق :",
               "tn": "💼 أرصدة الصناديق :",
               "en": "💼 Cash balances:"}
    lines = [headers.get(langue, headers["fr"])]
    for c in caisses:
        lines.append(f"• {c.get('nom','')} : {_fmt(c.get('solde',0))} {c.get('devise','')}")
    return "\n".join(lines)


def _response_bilan(data: dict, langue: str) -> str:
    if not isinstance(data, dict):
        return "📊 Bilan disponible."
    resume = data.get("resume", data)
    dev    = resume.get("devise", data.get("devise", "TND"))
    debit  = _fmt(resume.get("total_debit",  data.get("total_debit", 0)))
    credit = _fmt(resume.get("total_credit", data.get("total_credit", 0)))
    solde  = _fmt(resume.get("solde",        data.get("solde", 0)))
    if langue == "ar":
        return f"📊 الميزانية :\n• خصم : {debit} {dev}\n• دائن : {credit} {dev}\n• الرصيد : {solde} {dev}"
    elif langue == "tn":
        return f"📊 البيلان :\n• الخروج : {debit} {dev}\n• الدخول : {credit} {dev}\n• الرصيد : {solde} {dev}"
    elif langue == "en":
        return f"📊 Balance:\n• Debit  : {debit} {dev}\n• Credit : {credit} {dev}\n• Balance: {solde} {dev}"
    else:
        return f"📊 Bilan :\n• Débit  : {debit} {dev}\n• Crédit : {credit} {dev}\n• Solde  : {solde} {dev}"


def _response_list_bordereaux(data: dict, langue: str) -> str:
    if isinstance(data, dict):
        items = data.get("items", [])
        total = data.get("total", 0)
    else:
        items, total = [], 0

    headers = {"fr": f"📋 {total} bordereau(x) trouvé(s) :",
               "ar": f"📋 تم العثور على {total} بوردرو :",
               "tn": f"📋 لقيت {total} بوردرو :",
               "en": f"📋 {total} bordereau(x) found:"}
    lines = [headers.get(langue, headers["fr"])]
    for b in items[:5]:
        lines.append(f"• {b.get('reference','')} | {b.get('type_bordereau','')} | "
                     f"{_fmt(b.get('montant_total',0))} TND | {b.get('etat_global','')}")
    return "\n".join(lines)


def _response_bordereau_detail(d: dict, langue: str) -> str:
    ref  = d.get("reference", "N/A")
    typ  = d.get("type_bordereau", "")
    mnt  = _fmt(d.get("montant_total", 0))
    eg   = d.get("etat_global", "")
    et   = d.get("etat_transactions", "")
    dr   = d.get("date_remise", "")
    if langue == "ar":
        return (f"📋 تفاصيل البوردرو :\n• المرجع : {ref}\n• النوع : {typ}\n"
                f"• المبلغ : {mnt} TND\n• الحالة العامة : {eg}\n"
                f"• حالة المعاملات : {et}\n• تاريخ التسليم : {dr}")
    elif langue == "en":
        return (f"📋 Bordereau details:\n• Reference: {ref}\n• Type : {typ}\n"
                f"• Amount : {mnt} TND\n• Status : {eg}\n"
                f"• Transactions : {et}\n• Date : {dr}")
    else:
        return (f"📋 Détails du bordereau :\n• Référence : {ref}\n• Type : {typ}\n"
                f"• Montant : {mnt} TND\n• État global : {eg}\n"
                f"• État transactions : {et}\n• Date remise : {dr}")


def _response_bordereau_cree(d: dict, langue: str) -> str:
    ref = d.get("reference", "N/A")
    typ = d.get("type_bordereau", "")
    mnt = _fmt(d.get("montant_total", 0))
    eg  = d.get("etat_global", "En attente")
    if langue == "ar":
        return f"✅ تم إنشاء البوردرو !\n• المرجع : {ref}\n• النوع : {typ}\n• المبلغ : {mnt} TND\n• الحالة : {eg}"
    elif langue == "tn":
        return f"✅ تعمّل البوردرو !\n• المرجع : {ref}\n• النوع : {typ}\n• المبلغ : {mnt} TND"
    elif langue == "en":
        return f"✅ Bordereau created!\n• Reference: {ref}\n• Type : {typ}\n• Amount : {mnt} TND\n• Status : {eg}"
    else:
        return f"✅ Bordereau créé !\n• Référence : {ref}\n• Type : {typ}\n• Montant : {mnt} TND\n• État : {eg}"


def _response_tableau_bord(data: dict, langue: str) -> str:
    if not isinstance(data, dict):
        return "📊 Tableau de bord disponible."
    caisses = _fmt(data.get("total_caisses", 0))
    banques = _fmt(data.get("total_banques", 0))
    dev     = data.get("devise", "TND")
    if langue == "ar":
        return f"📊 لوحة القيادة :\n• إجمالي الصناديق : {caisses} {dev}\n• إجمالي البنوك : {banques} {dev}"
    elif langue == "en":
        return f"📊 Dashboard:\n• Total Cash  : {caisses} {dev}\n• Total Banks : {banques} {dev}"
    else:
        return f"📊 Tableau de bord :\n• Mes caisses : {caisses} {dev}\n• Mes banques : {banques} {dev}"


def _response_prevision(data: dict, langue: str, annee: int) -> str:
    if not isinstance(data, dict):
        return f"📈 Prévision {annee} disponible."
    total_credit = _fmt(data.get("total_credit", 0))
    total_debit  = _fmt(data.get("total_debit",  0))
    dev          = data.get("devise", "TND")
    if langue == "ar":
        return (f"📈 التوقعات المالية {annee} :\n"
                f"• إجمالي الدائن : {total_credit} {dev}\n"
                f"• إجمالي الخصم : {total_debit} {dev}")
    elif langue == "en":
        return (f"📈 Financial forecast {annee}:\n"
                f"• Total Credit : {total_credit} {dev}\n"
                f"• Total Debit  : {total_debit} {dev}")
    else:
        return (f"📈 Prévision financière {annee} :\n"
                f"• Total Crédit : {total_credit} {dev}\n"
                f"• Total Débit  : {total_debit} {dev}")


def _response_comptes_bancaires(data, langue: str) -> str:
    comptes = data if isinstance(data, list) else ([data] if isinstance(data, dict) else [])
    headers = {"fr": "🏦 Comptes bancaires :",
               "ar": "🏦 الحسابات البنكية :",
               "tn": "🏦 الحسابات البنكية :",
               "en": "🏦 Bank accounts:"}
    lines = [headers.get(langue, headers["fr"])]
    for c in comptes:
        solde = _fmt(c.get("solde_actuel", 0))
        lines.append(f"• {c.get('nom','')} — Solde : {solde} {c.get('devise','TND')}")
    return "\n".join(lines)


def _response_parametres(data, action: str, langue: str) -> str:
    items = data if isinstance(data, list) else ([data] if isinstance(data, dict) else [])
    labels = {
        "get_banques":              {"fr": "🏦 Banques configurées :", "en": "🏦 Configured banks:"},
        "get_params_caisses":       {"fr": "💼 Caisses configurées :", "en": "💼 Configured cash registers:"},
        "get_categories_depenses":  {"fr": "📂 Catégories de dépenses :", "en": "📂 Expense categories:"},
    }
    header = labels.get(action, {}).get(langue, labels.get(action, {}).get("fr", "📋 Paramètres :"))
    lines  = [header]
    for item in items[:10]:
        nom = item.get("nom") or item.get("name") or item.get("banque") or "N/A"
        lines.append(f"• {nom}")
    return "\n".join(lines)


# ════════════════════════════════════════════════════════════════
# MESSAGES UTILITAIRES
# ════════════════════════════════════════════════════════════════

def _msg_hors_scope(langue: str) -> str:
    return {
        "fr": ("Je suis l'assistant financier DWEXO. Je peux vous aider avec :\n"
               "• Transactions (débit, crédit, transfert)\n"
               "• Bordereaux\n• Bilan\n• Caisses\n• Comptes bancaires\n"
               "• Tableau de bord\n• Paramètres"),
        "ar": "أنا مساعد DWEXO المالي. يمكنني مساعدتك في المعاملات والبوردرو والميزانية والصناديق.",
        "tn": "أنا مساعد DWEXO المالي. نجم نعاونك في العمليات المالية والبوردرو والبيلان.",
        "en": ("I am the DWEXO financial assistant. I can help with:\n"
               "• Transactions • Bordereaux • Balance • Cash registers\n"
               "• Bank accounts • Dashboard • Settings"),
    }.get(langue, "Je suis l'assistant financier DWEXO.")


def _msg_erreur_mcp(langue: str) -> str:
    return {
        "fr": "❌ Serveur MCP inaccessible. Vérifiez que le port 8001 est actif.",
        "ar": "❌ الخادم غير متاح. تحقق من المنفذ 8001.",
        "tn": "❌ الخادم ما يخدمش. شوف المنفذ 8001.",
        "en": "❌ MCP server unreachable. Check port 8001.",
    }.get(langue, "❌ Erreur MCP.")