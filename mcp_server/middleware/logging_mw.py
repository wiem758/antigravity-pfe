# middleware/logging_mw.py
#
# RÔLE : Logger automatiquement chaque requête HTTP reçue par le serveur MCP.
# C'est essentiel pour la traçabilité : quand l'agent appelle un outil,
# on veut savoir exactement quand, avec quels paramètres, et ce qui s'est passé.
#
# Ce middleware est une classe qui "enveloppe" chaque requête :
#   Requête entrante → [middleware] → Route → [middleware] → Réponse sortante
#
# Format du log (JSON structuré, facilement parseable par des outils de monitoring) :
# {
#   "timestamp": "2025-05-15T10:32:45",
#   "method": "POST",
#   "path": "/tools/list_invoices",
#   "status_code": 200,
#   "duration_ms": 12.4,
#   "client_ip": "127.0.0.1"
# }

import time
import logging
import json
from datetime import datetime
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp


# ---------------------------------------------------------------------------
# Configuration du logger Python standard
# ---------------------------------------------------------------------------
# On configure un logger nommé "mcp_server" avec le format JSON.
# En production, ce logger peut être branché sur un système centralisé
# (ELK Stack, Datadog, CloudWatch…).

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s"  # On formate nous-mêmes en JSON dans le middleware
)
logger = logging.getLogger("mcp_server")


# ---------------------------------------------------------------------------
# LoggingMiddleware — classe middleware Starlette/FastAPI
# ---------------------------------------------------------------------------
# BaseHTTPMiddleware est la classe de base fournie par Starlette (le framework
# sous-jacent à FastAPI). On surcharge dispatch() pour intercepter les requêtes.

class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware de logging automatique.
    Enregistre chaque requête entrante avec sa durée et son statut.
    """

    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next) -> Response:
        """
        dispatch() est appelé pour CHAQUE requête.

        Paramètres :
          - request  : l'objet requête HTTP (méthode, URL, headers, body…)
          - call_next : fonction qui appelle la route suivante dans la chaîne

        Fonctionnement :
          1. Mesurer le temps avant d'appeler la route
          2. Appeler la route (call_next)
          3. Mesurer le temps après
          4. Logger toutes les infos
          5. Retourner la réponse au client
        """

        # Étape 1 : horodatage de début
        start_time = time.perf_counter()
        timestamp = datetime.now().isoformat()

        # Étape 2 : laisser la requête atteindre la route
        # call_next() suspend ce middleware et exécute la route
        try:
            response: Response = await call_next(request)
            error = None
        except Exception as exc:
            # Si la route lève une exception non gérée → on la capture pour
            # la logger avant de la re-propager
            error = str(exc)
            raise
        finally:
            # Étape 3 : calculer la durée en millisecondes
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)

            # Étape 4 : construire et émettre le log JSON
            log_entry = {
                "timestamp": timestamp,
                "method": request.method,           # GET, POST, PATCH…
                "path": str(request.url.path),      # /tools/list_invoices
                "query": str(request.url.query),    # ?page=1&status=pending
                "status_code": getattr(response if not error else None, "status_code", 500),
                "duration_ms": duration_ms,
                "client_ip": request.client.host if request.client else "unknown",
                "user_agent": request.headers.get("user-agent", ""),
            }

            # Choisir le niveau de log selon le statut HTTP
            status_code = log_entry["status_code"]
            if status_code >= 500:
                logger.error(json.dumps(log_entry))   # Erreur serveur → ERROR
            elif status_code >= 400:
                logger.warning(json.dumps(log_entry)) # Erreur client → WARNING
            else:
                logger.info(json.dumps(log_entry))    # Succès → INFO

        return response
