# api/routes/chat.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os, re, json, httpx
from datetime import date
from api.services.gemini_service import call_gemini as gemini_call

load_dotenv()

router = APIRouter(tags=["Chat"])

MCP_URL        = os.getenv("MCP_SERVER_URL", "http://localhost:8001")
MCP_KEY        = os.getenv("MCP_API_KEY",    "dev-secret-key")

# ── Mémoire conversationnelle simple ──────────────────────────────────────
_SESSIONS: dict[str, list] = {}

class ChatRequest(BaseModel):
    message:    str
    session_id: str

class ChatResponse(BaseModel):
    response:         str
    session_id:       str
    transaction_data: Optional[dict] = None
    tool_called:      Optional[str]  = None
    success:          bool = True


# ══════════════════════════════════════════════════════════════════════
# PROMPT GEMINI — détection auto + multilingue
# ══════════════════════════════════════════════════════════════════════
SYSTEM_PROMPT = """Tu es DWEXO Assistant, un agent financier intelligent.

RÈGLE 1 — LANGUE :
Détecte la langue de l'utilisateur et réponds TOUJOURS dans la même langue.
Langues : français, arabe standard, dialecte tunisien, anglais, autre.

RÈGLE 2 — DÉTECTION AUTOMATIQUE DU TYPE DE TRANSACTION :
L'utilisateur N'EST PAS obligé de dire débit/crédit/transfert.
Tu analyses le contexte et déduis le type.

DÉBIT (argent qui sort) :
→ payer, régler, fournisseur, dépense, acheter, charge
→ pay, supplier, purchase, buy, expense
→ خلّص، دفع، ادفع، مورد، مصروف، شري

CRÉDIT (argent qui entre) :
→ encaisser, recevoir, client paie, règlement
→ receive, collect, customer paid, cash in
→ حصّل، استقبل، عميل خلّص، دخل فلوس، قبضنا

TRANSFERT (déplacement interne entre caisses) :
→ transférer, virer, de caisse X vers Y, déplacer
→ transfer, move funds, from X to Y
→ حوّل، نقل فلوس، من صندوق لصندوق

LISTE : lister, voir, afficher, historique, transactions
        list, show, display, history
        اعرض، شوف، معاملات، وريني

INFO SOLDE : solde, caisse, combien, balance
             balance, how much, available
             شحال عندنا، قداه، الرصيد، كيفاش الصندوق

CAISSES DISPONIBLES :
- caisse-001 : Caisse Espèce TND  (par défaut)
- caisse-002 : Caisse Espèce EUR  (si EUR mentionné)
- caisse-003 : Caisse Principale TND

VALEURS PAR DÉFAUT si non précisé :
- mode_paiement → Espèce
- devise        → TND
- date          → aujourd'hui
- etat          → Payé
- source_destination → Caisse

EXEMPLES DE DÉTECTION AUTOMATIQUE :
"خلّص لمورد باريس 500 يورو" → DÉBIT, EUR, caisse-002
"عميل دوبون خلّص 2000 دينار" → CRÉDIT, TND, caisse-001
"حوّل 1000 دينار للصندوق الرئيسي" → TRANSFERT
"pay supplier 300 EUR" → DÉBIT, EUR, caisse-002
"customer Ben Ali paid 2000 TND" → CRÉDIT, TND
"show me all transactions" → LISTE
"شحال عندنا فالصندوق؟" → INFO SOLDE

INSTRUCTIONS :
1. Analyse la demande et détecte le type
2. Extrais tous les paramètres disponibles
3. Si des paramètres manquent, utilise les valeurs par défaut
4. Réponds UNIQUEMENT avec un JSON valide, rien d'autre

FORMAT JSON À RETOURNER :
{
  "action": "create_debit|create_credit|create_transfert|list_transactions|get_caisses|unknown",
  "langue": "fr|ar|tn|en|other",
  "params": {
    "caisse_id": "caisse-001",
    "montant": 500,
    "devise": "TND",
    "mode_paiement": "Espèce",
    "date_reglement": "2026-06-17",
    "etat": "Payé",
    "source_destination": "Caisse",
    "fournisseur_nom": null,
    "client_nom": null,
    "facture_id": null,
    "note": null,
    "source_id": null,
    "destination_id": null,
    "date_transfert": null
  },
  "message_utilisateur": "réponse courte à afficher à l'utilisateur si action=unknown"
}
"""


# ══════════════════════════════════════════════════════════════════════
# APPEL GEMINI
# ══════════════════════════════════════════════════════════════════════
def call_gemini(history: list, user_message: str) -> dict:
    """Appelle Gemini 2 .5 via le SDK officiel."""
    return gemini_call(history, user_message, SYSTEM_PROMPT)


# ══════════════════════════════════════════════════════════════════════
# APPELS MCP
# ══════════════════════════════════════════════════════════════════════
def call_mcp(endpoint: str, method: str = "POST", body: dict = None) -> dict:
    """Appelle le serveur MCP."""
    headers = {
        "X-API-Key":    MCP_KEY,
        "Content-Type": "application/json"
    }
    with httpx.Client(base_url=MCP_URL, headers=headers, timeout=30) as client:
        if method == "GET":
            r = client.get(endpoint)
        else:
            r = client.post(endpoint, json=body or {})
    return r.json()


def build_response_text(action: str, mcp_result: dict, langue: str) -> str:
    """Construit la réponse texte selon la langue et le résultat."""

    if not mcp_result.get("success"):
        err = mcp_result.get("error", "Erreur inconnue")
        msgs = {
            "fr": f"❌ Erreur : {err}",
            "ar": f"❌ خطأ : {err}",
            "tn": f"❌ غلطة : {err}",
            "en": f"❌ Error: {err}",
        }
        return msgs.get(langue, msgs["fr"])

    data = mcp_result.get("data", {})

    # ── Réponse soldes ──────────────────────────────────────────────
    if action == "get_caisses":
        caisses = data if isinstance(data, list) else []
        if langue == "tn":
            lines = ["💼 هاكا أرصدة الصناديق :"]
            for c in caisses:
                lines.append(f"• {c.get('nom','')} : {c.get('solde',0):,.3f} {c.get('devise','')}")
        elif langue == "ar":
            lines = ["💼 أرصدة الصناديق :"]
            for c in caisses:
                lines.append(f"• {c.get('nom','')} : {c.get('solde',0):,.3f} {c.get('devise','')}")
        elif langue == "en":
            lines = ["💼 Cash balances:"]
            for c in caisses:
                lines.append(f"• {c.get('nom','')} : {c.get('solde',0):,.3f} {c.get('devise','')}")
        else:
            lines = ["💼 Soldes des caisses :"]
            for c in caisses:
                lines.append(f"• {c.get('nom','')} : {c.get('solde',0):,.3f} {c.get('devise','')}")
        return "\n".join(lines)

    # ── Réponse liste ───────────────────────────────────────────────
    if action == "list_transactions":
        items = data.get("items", []) if isinstance(data, dict) else []
        total = data.get("total", 0)   if isinstance(data, dict) else 0
        if langue == "tn":
            header = f"📋 لقيت {total} عملية :"
        elif langue == "ar":
            header = f"📋 تم العثور على {total} عملية :"
        elif langue == "en":
            header = f"📋 Found {total} transaction(s):"
        else:
            header = f"📋 {total} transaction(s) trouvée(s) :"
        lines = [header]
        for t in items[:5]:
            typ = t.get("type_transaction","").upper()
            lines.append(
                f"• {t.get('numero','')} | {typ} | "
                f"{t.get('montant',0):,.3f} {t.get('devise','')} | "
                f"{t.get('etat','')}"
            )
        return "\n".join(lines)

    # ── Réponse transaction créée ───────────────────────────────────
    if isinstance(data, dict):
        num  = data.get("numero", "N/A")
        mnt  = data.get("montant", 0)
        dev  = data.get("devise",  "TND")
        eta  = data.get("etat",    "Payé")
        cais = data.get("caisse_nom", "")
        typ  = data.get("type_transaction", "")

        if langue == "tn":
            t_label = "دبيت" if typ=="debit" else "كريدي" if typ=="credit" else "تحويل"
            return (
                f"✅ تسجّلت العملية بالنجاح!\n"
                f"• النوع : {t_label}\n"
                f"• الرقم : {num}\n"
                f"• المبلغ : {mnt:,.3f} {dev}\n"
                f"• الصندوق : {cais}\n"
                f"• الحالة : {eta}"
            )
        elif langue == "ar":
            t_label = "خصم" if typ=="debit" else "إيداع" if typ=="credit" else "تحويل"
            return (
                f"✅ تمت العملية بنجاح!\n"
                f"• النوع : {t_label}\n"
                f"• الرقم : {num}\n"
                f"• المبلغ : {mnt:,.3f} {dev}\n"
                f"• الصندوق : {cais}\n"
                f"• الحالة : {eta}"
            )
        elif langue == "en":
            t_label = "Debit" if typ=="debit" else "Credit" if typ=="credit" else "Transfer"
            return (
                f"✅ Transaction recorded successfully!\n"
                f"• Type   : {t_label}\n"
                f"• Number : {num}\n"
                f"• Amount : {mnt:,.3f} {dev}\n"
                f"• Cash   : {cais}\n"
                f"• Status : {eta}"
            )
        else:
            t_label = "Débit" if typ=="debit" else "Crédit" if typ=="credit" else "Transfert"
            return (
                f"✅ Opération enregistrée avec succès !\n"
                f"• Type    : {t_label}\n"
                f"• Numéro  : {num}\n"
                f"• Montant : {mnt:,.3f} {dev}\n"
                f"• Caisse  : {cais}\n"
                f"• État    : {eta}"
            )

    return "✅ Opération effectuée."


# ══════════════════════════════════════════════════════════════════════
# ENDPOINT PRINCIPAL
# ══════════════════════════════════════════════════════════════════════
@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:

    # Charger / créer la session
    if req.session_id not in _SESSIONS:
        _SESSIONS[req.session_id] = []
    history = _SESSIONS[req.session_id]

    try:
        # ── 1. Gemini analyse la demande ──────────────────────────────
        gemini_result = call_gemini(history, req.message)

        action = gemini_result.get("action", "unknown")
        langue = gemini_result.get("langue", "fr")
        params = gemini_result.get("params", {})
        today  = date.today().isoformat()

        # ── 2. Appliquer valeurs par défaut ───────────────────────────
        params.setdefault("date_reglement",    today)
        params.setdefault("date_transfert",    today)
        params.setdefault("etat",              "Payé")
        params.setdefault("mode_paiement",     "Espèce")
        params.setdefault("devise",            "TND")
        params.setdefault("source_destination","Caisse")

        # Caisse par défaut selon devise
        if not params.get("caisse_id"):
            params["caisse_id"] = "caisse-002" if params["devise"] == "EUR" else "caisse-001"

        # ── 3. Appeler le MCP selon l'action ──────────────────────────
        mcp_result      = None
        transaction_data = None

        if action == "create_debit":
            body = {k: params[k] for k in [
                "caisse_id","montant","mode_paiement",
                "date_reglement","etat","devise","source_destination"
            ] if k in params and params[k] is not None}
            for k in ["fournisseur_nom","facture_id","note","categorie_depense"]:
                if params.get(k): body[k] = params[k]
            mcp_result = call_mcp("/tools/transactions/debit", "POST", body)
            if mcp_result.get("success"):
                transaction_data = mcp_result.get("data")

        elif action == "create_credit":
            body = {k: params[k] for k in [
                "caisse_id","montant","mode_paiement",
                "date_reglement","etat","devise","source_destination"
            ] if k in params and params[k] is not None}
            for k in ["client_nom","facture_id","note","rib"]:
                if params.get(k): body[k] = params[k]
            mcp_result = call_mcp("/tools/transactions/credit", "POST", body)
            if mcp_result.get("success"):
                transaction_data = mcp_result.get("data")

        elif action == "create_transfert":
            body = {
                "source_id":      params.get("source_id", "caisse-001"),
                "destination_id": params.get("destination_id", "caisse-003"),
                "montant":        params.get("montant", 0),
                "devise":         params.get("devise", "TND"),
                "date_transfert": params.get("date_transfert", today),
            }
            if params.get("note"): body["note"] = params["note"]
            mcp_result = call_mcp("/tools/transactions/transfert", "POST", body)
            if mcp_result.get("success"):
                transaction_data = mcp_result.get("data")

        elif action == "list_transactions":
            body = {}
            if params.get("etat") and params["etat"] != "Payé":
                body["etat"] = params["etat"]
            mcp_result = call_mcp("/tools/transactions/list", "POST", body)

        elif action == "get_caisses":
            mcp_result = call_mcp("/tools/transactions/caisses/list", "GET")

        # ── 4. Construire la réponse ───────────────────────────────────
        if mcp_result:
            response_text = build_response_text(action, mcp_result, langue)
        else:
            # Action inconnue ou question générale → réponse Gemini directe
            response_text = gemini_result.get(
                "message_utilisateur",
                "Je suis votre assistant financier DWEXO. Comment puis-je vous aider ?"
            )

        # ── 5. Sauvegarder en mémoire ─────────────────────────────────
        history.append({"role": "user",      "content": req.message})
        history.append({"role": "assistant", "content": response_text})
        if len(history) > 20:
            history = history[-20:]
        _SESSIONS[req.session_id] = history

        return ChatResponse(
            response=response_text,
            session_id=req.session_id,
            transaction_data=transaction_data,
            tool_called=action,
            success=True
        )

    except httpx.ConnectError:
        msgs = {
            "fr": "❌ Serveur MCP inaccessible. Vérifiez que le port 8001 est actif.",
            "ar": "❌ الخادم غير متاح. تحقق من المنفذ 8001.",
            "tn": "❌ الخادم ما يخدمش. شوف المنفذ 8001.",
            "en": "❌ MCP server unreachable. Check port 8001.",
        }
        return ChatResponse(
            response=msgs.get("fr"), session_id=req.session_id, success=False
        )
    except Exception as e:
        return ChatResponse(
            response=f"❌ 💥 Erreur serveur : {str(e)}",
            session_id=req.session_id,
            success=False
        )