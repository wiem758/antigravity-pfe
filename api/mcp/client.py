# mcp_client/client.py
#
# Client MCP qui communique avec le serveur DWEXO.
# Utilisé par l'agent Gemini pour appeler les outils.

import asyncio
from mcp import ClientSession
from mcp.client.stdio import stdio_client, StdioServerParameters


class DWEXOMCPClient:
    """
    Client MCP réutilisable pour l'agent DWEXO.
    Expose toutes les méthodes correspondant aux outils du serveur.
    """

    def __init__(self):
        self.server = StdioServerParameters(
            command="python",
            args=["mcp_server/server.py"]
        )

    async def call(self, tool_name: str, params: dict = None) -> dict:
        """Appelle un outil MCP et retourne le résultat."""
        async with stdio_client(self.server) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, params or {})
                return result.content

    # ── Transactions ───────────────────────────────────────────────────

    async def get_transactions(self, **kwargs) -> dict:
        return await self.call("get_transactions", kwargs)

    async def get_transaction(self, transaction_id: str) -> dict:
        return await self.call("get_transaction", {"transaction_id": transaction_id})

    async def create_debit(self, **kwargs) -> dict:
        return await self.call("create_debit", kwargs)

    async def create_credit(self, **kwargs) -> dict:
        return await self.call("create_credit", kwargs)

    async def create_transfert(self, **kwargs) -> dict:
        return await self.call("create_transfert", kwargs)

    async def get_caisses(self) -> dict:
        return await self.call("get_caisses", {})

    # ── Bordereaux ─────────────────────────────────────────────────────

    async def get_bordereaux(self, **kwargs) -> dict:
        return await self.call("get_bordereaux", kwargs)

    async def get_bordereau(self, bordereau_id: str) -> dict:
        return await self.call("get_bordereau", {"bordereau_id": bordereau_id})

    async def create_bordereau(self, **kwargs) -> dict:
        return await self.call("create_bordereau", kwargs)

    async def valider_bordereau(self, bordereau_id: str, raison: str = None) -> dict:
        params = {"bordereau_id": bordereau_id}
        if raison: params["raison"] = raison
        return await self.call("valider_bordereau", params)

    async def annuler_bordereau(self, bordereau_id: str, raison: str = None) -> dict:
        params = {"bordereau_id": bordereau_id}
        if raison: params["raison"] = raison
        return await self.call("annuler_bordereau", params)

    async def supprimer_bordereau(self, bordereau_id: str) -> dict:
        return await self.call("supprimer_bordereau", {"bordereau_id": bordereau_id})

    async def modifier_bordereau(self, bordereau_id: str, **kwargs) -> dict:
        kwargs["bordereau_id"] = bordereau_id
        return await self.call("modifier_bordereau", kwargs)


# ============================================================
# TEST — vérifie que tous les outils sont disponibles
# ============================================================
async def main():
    server = StdioServerParameters(
        command="python",
        args=["mcp_server/server.py"]
    )

    async with stdio_client(server) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Lister tous les outils disponibles
            tools = await session.list_tools()
            print("=== OUTILS DISPONIBLES ===")
            for tool in tools.tools:
                print(f"  • {tool.name} — {tool.description[:60]}...")
            print()

            # ── Test transactions ──────────────────────────────────────
            print("=== TEST : get_caisses ===")
            result = await session.call_tool("get_caisses", {})
            print(result.content)
            print()

            print("=== TEST : get_transactions ===")
            result = await session.call_tool("get_transactions", {"page": 1, "page_size": 3})
            print(result.content)
            print()

            print("=== TEST : create_debit ===")
            result = await session.call_tool("create_debit", {
                "caisse_id":      "caisse-001",
                "montant":        500.0,
                "devise":         "TND",
                "mode_paiement":  "Espèce",
                "fournisseur_nom": "Dupont SA",
            })
            print(result.content)
            print()

            print("=== TEST : create_credit ===")
            result = await session.call_tool("create_credit", {
                "caisse_id":   "caisse-001",
                "montant":     1200.0,
                "devise":      "TND",
                "client_nom":  "Ben Ali Industries",
            })
            print(result.content)
            print()

            # ── Test bordereaux ────────────────────────────────────────
            print("=== TEST : get_bordereaux ===")
            result = await session.call_tool("get_bordereaux", {})
            print(result.content)
            print()

            print("=== TEST : get_bordereaux (filtre validés) ===")
            result = await session.call_tool("get_bordereaux", {
                "etat_global": "Validé"
            })
            print(result.content)
            print()

            print("=== TEST : create_bordereau ===")
            result = await session.call_tool("create_bordereau", {
                "type_bordereau": "Chèque",
                "montant_total":  3500.0,
                "note":           "Remise chèques juillet 2026",
            })
            print(result.content)
            print()

            print("=== TEST : get_bordereau (par référence) ===")
            result = await session.call_tool("get_bordereau", {
                "bordereau_id": "BRD-2026-0001"
            })
            print(result.content)


if __name__ == "__main__":
    asyncio.run(main())