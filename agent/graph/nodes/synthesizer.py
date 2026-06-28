# agent/graph/nodes/synthesizer.py

from agent.llm.gemini_client import gemini_client

SYNTH_PROMPT = """Tu es un assistant financier DWEXO.
Formule une reponse claire en francais a partir de ces donnees :
{context}

Regles :
- Transaction creee : commence par OK et donne numero, montant, etat
- Erreur : explique simplement le probleme
- Liste : resume les transactions trouvees
- Soldes : liste chaque caisse avec son solde
- Maximum 100 mots, ton professionnel
"""


def synthesize(state: dict) -> dict:
    # Cas 1 : refus de domaine déjà formulé
    if not state.get("domain_valid") and state.get("response"):
        return state

    error      = state.get("error")
    tool_result = state.get("tool_result", {})
    tool_called = state.get("tool_called", "")

    # Construire le contexte à envoyer à Gemini
    if error:
        context = f"ERREUR lors de '{tool_called}' : {error}"
    elif tool_result and tool_result.get("success"):
        import json
        context = f"Resultat de '{tool_called}' :\n{json.dumps(tool_result.get('data'), ensure_ascii=False, indent=2)}"
    else:
        last_msg = ""
        for m in reversed(state["messages"]):
            if m["role"] == "user":
                last_msg = m["content"]
                break
        context = f"L'utilisateur demande : {last_msg}. Pas d'outil appele."

    try:
        response = gemini_client.generate(
            user_message=SYNTH_PROMPT.format(context=context)
        )
    except Exception as e:
        # Fallback sans Gemini
        if error:
            response = f"Erreur : {error}"
        elif tool_result and tool_result.get("success"):
            data = tool_result.get("data", {})
            if isinstance(data, dict):
                response = (
                    f"Operation reussie !\n"
                    f"Numero : {data.get('numero', 'N/A')}\n"
                    f"Montant : {data.get('montant', 0)} {data.get('devise', '')}\n"
                    f"Etat : {data.get('etat', 'N/A')}"
                )
            else:
                response = "Operation effectuee avec succes."
        else:
            response = "Pouvez-vous preciser votre demande ?"

    return {**state, "response": response}