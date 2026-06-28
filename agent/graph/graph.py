# agent/graph/graph.py
#
# Construit et compile le graphe LangGraph.
# Appelé une seule fois au démarrage de l'API.
#
# GRAPHE :
#   START → classify_intent → validate_domain
#                                  ↓ valid          ↓ invalide
#                            extract_params      synthesize → END
#                                  ↓ tool trouvé   ↓ pas d'outil
#                            execute_tool        synthesize → END
#                                  ↓
#                            synthesize → END

from langgraph.graph import StateGraph, END
from agent.graph.state import TransactionState
from agent.graph.nodes.intent_classifier import classify_intent
from agent.graph.nodes.domain_validator  import validate_domain
from agent.graph.nodes.tool_selector     import extract_params
from agent.graph.nodes.executor          import execute_tool
from agent.graph.nodes.synthesizer       import synthesize


def _route_domain(state: dict) -> str:
    """Après validate_domain : valid → extract_params, invalide → synthesize."""
    return "extract_params" if state.get("domain_valid") else "synthesize"


def _route_extract(state: dict) -> str:
    """Après extract_params : outil trouvé → execute_tool, sinon → synthesize."""
    return "execute_tool" if state.get("tool_name") else "synthesize"


def build_graph():
    """Construit et retourne le graphe LangGraph compilé."""
    g = StateGraph(TransactionState)

    # Nœuds
    g.add_node("classify_intent", classify_intent)
    g.add_node("validate_domain", validate_domain)
    g.add_node("extract_params",  extract_params)
    g.add_node("execute_tool",    execute_tool)
    g.add_node("synthesize",      synthesize)

    # Transitions
    g.set_entry_point("classify_intent")
    g.add_edge("classify_intent", "validate_domain")
    g.add_conditional_edges("validate_domain", _route_domain,
                            {"extract_params": "extract_params", "synthesize": "synthesize"})
    g.add_conditional_edges("extract_params", _route_extract,
                            {"execute_tool": "execute_tool", "synthesize": "synthesize"})
    g.add_edge("execute_tool", "synthesize")
    g.add_edge("synthesize", END)

    return g.compile()