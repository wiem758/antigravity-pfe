# mcp_server/services/dwexo_api_client.py
#
# Client HTTP vers l'API DWEXO réelle (cloud.dwexo.com).
# En dev sans DWEXO_API_URL configuré, les services utilisent des données mock.
# En prod : définir DWEXO_API_URL et DWEXO_API_KEY dans .env

import os
import httpx
from typing import Any, Optional

DWEXO_API_URL = os.getenv("DWEXO_API_URL", "")
DWEXO_API_KEY = os.getenv("DWEXO_API_KEY", "")


def is_live_api() -> bool:
    return bool(DWEXO_API_URL and DWEXO_API_KEY)


async def call_dwexo(
    method: str,
    path: str,
    json_body: Optional[dict] = None,
    params: Optional[dict] = None,
) -> Optional[dict]:
    """Appelle l'API DWEXO réelle. Retourne None si non configurée."""
    if not is_live_api():
        return None

    headers = {
        "Authorization": f"Bearer {DWEXO_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    url = f"{DWEXO_API_URL.rstrip('/')}{path}"

    async with httpx.AsyncClient(timeout=30) as client:
        if method == "GET":
            resp = await client.get(url, headers=headers, params=params)
        elif method == "POST":
            resp = await client.post(url, headers=headers, json=json_body)
        elif method == "PATCH":
            resp = await client.patch(url, headers=headers, json=json_body)
        elif method == "DELETE":
            resp = await client.delete(url, headers=headers)
        else:
            raise ValueError(f"Méthode HTTP inconnue : {method}")

        resp.raise_for_status()
        return resp.json()


def call_dwexo_sync(
    method: str,
    path: str,
    json_body: Optional[dict] = None,
    params: Optional[dict] = None,
) -> Optional[Any]:
    """Version synchrone pour les services FastAPI."""
    if not is_live_api():
        return None

    headers = {
        "Authorization": f"Bearer {DWEXO_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    url = f"{DWEXO_API_URL.rstrip('/')}{path}"

    with httpx.Client(timeout=30) as client:
        if method == "GET":
            resp = client.get(url, headers=headers, params=params)
        elif method == "POST":
            resp = client.post(url, headers=headers, json=json_body)
        elif method == "PATCH":
            resp = client.patch(url, headers=headers, json=json_body)
        elif method == "DELETE":
            resp = client.delete(url, headers=headers)
        else:
            raise ValueError(f"Méthode HTTP inconnue : {method}")

        resp.raise_for_status()
        return resp.json()
