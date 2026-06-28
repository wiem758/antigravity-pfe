# mcp_server/middleware/auth.py
# Vérification de la clé API dans l'en-tête X-API-Key.

import os
from fastapi import Security, HTTPException, status
from fastapi.security.api_key import APIKeyHeader

API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
VALID_KEY      = os.getenv("MCP_API_KEY", "dev-secret-key")


async def verify_api_key(api_key: str = Security(API_KEY_HEADER)) -> str:
    if not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="En-tête X-API-Key manquant")
    if api_key != VALID_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Clé API invalide")
    return api_key