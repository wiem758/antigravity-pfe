# agent/graph/nodes/intent_classifier.py

import json
import re
from agent.llm.gemini_client import gemini_client

CLASSIFY_PROMPT = """Analyse cette demande financière et retourne UN JSON.

RÈGLES :
DÉBIT si : payer, régler, fournisseur, dépense, acheter
           pay, supplier, purchase, expense, buy
           خلّص، دفع، ادفع، مورد، مصروف، شري
CRÉDIT si : encaisser, recevoir, client paie, entrée
            receive, collect, customer paid, cash in
            حصّل، استقبل، عميل خلّص، دخل فلوس
TRANSFERT si : transférer, virer, de...vers, déplacer
               transfer, move, from...to
               حوّل، نقل، من صندوق لصندوق
LISTE si : liste, voir, afficher, transactions, historique
           list, show, display, history
           اعرض، شوف، معاملات
INFO si : solde, caisse, combien, balance
          balance, how much, available
          شحال عندنا، قداه، الرصيد

Retourne UNIQUEMENT ce JSON :
{{"intent":"debit|credit|transfert|list|info|hors-scope","langue":"fr|ar|tn|en","montant":null,"devise":"TND|EUR|USD","entite":null}}

Demande : "{message}"
"""

DEBIT_KW    = ["payer","régler","fournisseur","dépense","acheter","débiter","pay","supplier","purchase","buy","expense","ادفع","دفع","مورد","مصروف","خلّص","خلص","بائع"]
CREDIT_KW   = ["encaisser","recevoir","client","entrée","encaissement","receive","collect","customer","cash in","حصّل","استقبل","عميل","قبض","دخل","عميل خلّص","عميل دفع"]
TRANSFER_KW = ["transférer","virer","transfert","de caisse","vers caisse","transfer","move","حوّل","تحويل","نقل","من صندوق","حوّل فلوس"]
LIST_KW     = ["liste","lister","voir","afficher","transactions","historique","list","show","display","اعرض","شوف","معاملات","وريني"]
INFO_KW     = ["solde","caisse","combien","disponible","balance","how much","شحال عندنا","قداه","الرصيد","كم عندنا"]


def classify_intent(state: dict) -> dict:
    last_msg = ""
    for m in reversed(state["messages"]):
        if m["role"] == "user":
            last_msg = m["content"]
            break

    intent = "hors-scope"
    langue = "fr"
    montant = None
    devise  = "TND"
    entite  = None

    # ── Appel Gemini ──────────────────────────────────────────────────
    try:
        prompt = CLASSIFY_PROMPT.format(
            message=last_msg.replace('"', "'").replace('\n', ' ')
        )
        raw = gemini_client.generate_json(prompt)
        raw = raw.strip()
        raw = re.sub(r'^```json\s*', '', raw)
        raw = re.sub(r'\s*```$', '', raw)
        raw = raw.strip()

        result  = json.loads(raw)
        intent  = result.get("intent",  "hors-scope")
        langue  = result.get("langue",  "fr")
        montant = result.get("montant", None)
        devise  = result.get("devise",  "TND")
        entite  = result.get("entite",  None)

    except Exception:
        # ── Fallback mots-clés si Gemini échoue ──────────────────────
        msg_lower = last_msg.lower()

        if any(kw in msg_lower for kw in DEBIT_KW):
            intent = "debit"
        elif any(kw in msg_lower for kw in CREDIT_KW):
            intent = "credit"
        elif any(kw in msg_lower for kw in TRANSFER_KW):
            intent = "transfert"
        elif any(kw in msg_lower for kw in LIST_KW):
            intent = "list"
        elif any(kw in msg_lower for kw in INFO_KW):
            intent = "info"

        # Devise
        if any(w in msg_lower for w in ["eur","euro","يورو"]):
            devise = "EUR"
        elif any(w in msg_lower for w in ["usd","dollar","دولار"]):
            devise = "USD"

        # Montant
        m_match = re.search(r"(\d+(?:[.,]\d+)?)", last_msg)
        if m_match:
            montant = float(m_match.group(1).replace(",", "."))

        # Langue
        arabic = set("ابتثجحخدذرزسشصضطظعغفقكلمنهوي")
        if any(c in last_msg for c in arabic):
            tunisian = ["شحال","خلّص","خلص","وريني","شوفلي","قداه","بقالنا","فالصندوق"]
            langue = "tn" if any(w in last_msg for w in tunisian) else "ar"
        elif re.search(r'\b[a-zA-Z]{3,}\b', last_msg):
            langue = "en"
        else:
            langue = "fr"

    return {
        **state,
        "intent":          intent,
        "langue_detectee": langue,
        "montant_detecte": montant,
        "devise_detectee": devise,
        "entite_detectee": entite,
    }