# tests/test_mcp_server.py
#
# RÔLE : Tests automatisés du serveur MCP.
# On utilise TestClient de FastAPI (basé sur httpx) qui simule des requêtes HTTP
# SANS lancer un vrai serveur — les tests sont donc très rapides.
#
# Lancer les tests :
#   pytest tests/test_mcp_server.py -v
#
# Le flag -v (verbose) affiche le nom de chaque test et son résultat.

import pytest
from fastapi.testclient import TestClient
from mcp_server.main import app

# ---------------------------------------------------------------------------
# Configuration du client de test
# ---------------------------------------------------------------------------
# TestClient simule un client HTTP qui appelle directement l'application
# FastAPI sans passer par le réseau. Idéal pour les tests unitaires.

client = TestClient(app)

# En-tête d'authentification utilisé dans tous les tests
# (correspond à la valeur par défaut de MCP_API_KEY en dev)
AUTH_HEADERS = {"X-API-Key": "dev-secret-key"}


# ===========================================================================
# TESTS : Endpoints de santé
# ===========================================================================

class TestHealth:
    """Tests des endpoints /health et /ready."""

    def test_health_returns_200(self):
        """Le serveur doit répondre OK quand il est en ligne."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"

    def test_ready_returns_200(self):
        """Le serveur doit signaler qu'il est prêt."""
        response = client.get("/ready")
        assert response.status_code == 200
        assert response.json()["status"] == "ready"


# ===========================================================================
# TESTS : Registre d'outils
# ===========================================================================

class TestToolsRegistry:
    """Tests de l'endpoint /tools/list."""

    def test_tools_list_returns_all_tools(self):
        """Le registre doit retourner les 5 outils attendus."""
        response = client.get("/tools/list")
        assert response.status_code == 200
        tools = response.json()["tools"]
        tool_names = [t["name"] for t in tools]
        assert "list_invoices" in tool_names
        assert "get_invoice" in tool_names
        assert "create_invoice" in tool_names
        assert "update_status" in tool_names
        assert "delete_invoice" in tool_names

    def test_each_tool_has_required_fields(self):
        """Chaque outil doit avoir name, description, method, endpoint, parameters."""
        response = client.get("/tools/list")
        for tool in response.json()["tools"]:
            assert "name" in tool
            assert "description" in tool
            assert "method" in tool
            assert "endpoint" in tool
            assert "parameters" in tool


# ===========================================================================
# TESTS : Authentification
# ===========================================================================

class TestAuthentication:
    """Tests de la vérification de clé API."""

    def test_missing_api_key_returns_401(self):
        """Sans clé API → refus avec HTTP 401."""
        response = client.post("/tools/list_invoices", json={})
        assert response.status_code == 401

    def test_wrong_api_key_returns_401(self):
        """Mauvaise clé API → refus avec HTTP 401."""
        response = client.post(
            "/tools/list_invoices",
            json={},
            headers={"X-API-Key": "mauvaise-cle"}
        )
        assert response.status_code == 401

    def test_correct_api_key_grants_access(self):
        """Bonne clé API → accès autorisé."""
        response = client.post(
            "/tools/list_invoices",
            json={},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200


# ===========================================================================
# TESTS : list_invoices
# ===========================================================================

class TestListInvoices:
    """Tests de POST /tools/list_invoices."""

    def test_list_all_invoices_without_filters(self):
        """Sans filtre → retourne toutes les factures de la DB mock (3 par défaut)."""
        response = client.post("/tools/list_invoices", json={}, headers=AUTH_HEADERS)
        assert response.status_code == 200
        body = response.json()
        assert body["success"] is True
        assert body["total"] >= 3  # La DB mock contient au moins 3 factures

    def test_filter_by_status_pending(self):
        """Filtrer par statut pending → ne retourne que les factures pending."""
        response = client.post(
            "/tools/list_invoices",
            json={"status": "pending"},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200
        body = response.json()
        items = body["data"]["items"]
        # Vérifier que tous les éléments retournés ont bien le statut "pending"
        for item in items:
            assert item["status"] == "pending"

    def test_filter_by_client_name_partial(self):
        """Recherche partielle sur le nom client (insensible à la casse)."""
        response = client.post(
            "/tools/list_invoices",
            json={"client_name": "dup"},  # "dup" doit matcher "Dupont SA"
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200
        items = response.json()["data"]["items"]
        for item in items:
            assert "dup" in item["client_name"].lower()

    def test_filter_by_min_amount(self):
        """Filtrer par montant minimum → exclut les factures sous le seuil."""
        response = client.post(
            "/tools/list_invoices",
            json={"min_amount": 1500},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200
        items = response.json()["data"]["items"]
        for item in items:
            assert item["total_ttc"] >= 1500

    def test_pagination_page_size(self):
        """Pagination : page_size=1 → retourne exactement 1 élément."""
        response = client.post(
            "/tools/list_invoices",
            json={"page": 1, "page_size": 1},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200
        data = response.json()["data"]
        assert len(data["items"]) == 1
        assert data["page"] == 1
        assert data["page_size"] == 1


# ===========================================================================
# TESTS : get_invoice
# ===========================================================================

class TestGetInvoice:
    """Tests de GET /tools/invoices/{invoice_id}."""

    def test_get_existing_invoice(self):
        """Récupérer une facture existante → retourne les données complètes."""
        response = client.get("/tools/invoices/inv-001", headers=AUTH_HEADERS)
        assert response.status_code == 200
        body = response.json()
        assert body["success"] is True
        assert body["data"]["id"] == "inv-001"
        assert body["data"]["client_name"] == "Dupont SA"

    def test_get_nonexistent_invoice_returns_404(self):
        """Facture inexistante → HTTP 404."""
        response = client.get("/tools/invoices/inv-999", headers=AUTH_HEADERS)
        assert response.status_code == 404


# ===========================================================================
# TESTS : create_invoice
# ===========================================================================

class TestCreateInvoice:
    """Tests de POST /tools/create_invoice."""

    def test_create_valid_invoice(self):
        """Créer une facture valide → HTTP 201 + facture retournée."""
        payload = {
            "client_id": "cli-003",
            "client_name": "Ben Ali Industries",
            "lines": [
                {"description": "Audit informatique", "quantity": 3, "unit_price": 400, "vat_rate": 20}
            ],
            "due_date": "2025-12-31",
            "payment_method": "bank_transfer"
        }
        response = client.post("/tools/create_invoice", json=payload, headers=AUTH_HEADERS)
        assert response.status_code == 201
        body = response.json()
        assert body["success"] is True
        data = body["data"]
        assert data["client_name"] == "Ben Ali Industries"
        assert data["status"] == "draft"  # Toujours DRAFT à la création
        assert data["total_ht"] == 1200.0   # 3 × 400
        assert data["total_tva"] == 240.0   # 1200 × 20%
        assert data["total_ttc"] == 1440.0  # 1200 + 240

    def test_create_invoice_past_due_date_fails(self):
        """Date d'échéance dans le passé → HTTP 422 (validation Pydantic)."""
        payload = {
            "client_id": "cli-001",
            "client_name": "Test",
            "lines": [{"description": "Test", "quantity": 1, "unit_price": 100, "vat_rate": 20}],
            "due_date": "2020-01-01",  # Dans le passé → invalide
        }
        response = client.post("/tools/create_invoice", json=payload, headers=AUTH_HEADERS)
        assert response.status_code == 422  # Unprocessable Entity

    def test_create_invoice_missing_required_field(self):
        """Champ obligatoire manquant → HTTP 422."""
        payload = {
            "client_name": "Test",
            # client_id manquant → erreur de validation
        }
        response = client.post("/tools/create_invoice", json=payload, headers=AUTH_HEADERS)
        assert response.status_code == 422


# ===========================================================================
# TESTS : update_status
# ===========================================================================

class TestUpdateStatus:
    """Tests de PATCH /tools/invoices/{id}/status."""

    def test_mark_invoice_as_paid(self):
        """Marquer une facture comme payée → paid_at est renseigné."""
        response = client.patch(
            "/tools/invoices/inv-001/status",
            json={"status": "paid", "reason": "Virement reçu"},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 200
        body = response.json()
        assert body["success"] is True
        assert body["data"]["new_status"] == "paid"

    def test_cannot_modify_cancelled_invoice(self):
        """Une facture annulée ne peut plus être modifiée → HTTP 400."""
        # D'abord annuler la facture inv-003
        client.delete("/tools/invoices/inv-003", headers=AUTH_HEADERS)
        # Ensuite tenter de la modifier
        response = client.patch(
            "/tools/invoices/inv-003/status",
            json={"status": "pending"},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 400

    def test_update_nonexistent_invoice_returns_404(self):
        """Facture inexistante → HTTP 404."""
        response = client.patch(
            "/tools/invoices/inv-999/status",
            json={"status": "paid"},
            headers=AUTH_HEADERS
        )
        assert response.status_code == 404


# ===========================================================================
# TESTS : delete_invoice
# ===========================================================================

class TestDeleteInvoice:
    """Tests de DELETE /tools/invoices/{id}."""

    def test_cancel_pending_invoice(self):
        """Annuler une facture pending → statut CANCELLED."""
        response = client.delete("/tools/invoices/inv-001", headers=AUTH_HEADERS)
        assert response.status_code == 200
        assert response.json()["data"]["status"] == "cancelled"

    def test_cannot_cancel_paid_invoice(self):
        """Une facture payée ne peut pas être annulée → HTTP 400."""
        response = client.delete("/tools/invoices/inv-002", headers=AUTH_HEADERS)
        assert response.status_code == 400

    def test_delete_nonexistent_invoice_returns_404(self):
        """Facture inexistante → HTTP 404."""
        response = client.delete("/tools/invoices/inv-999", headers=AUTH_HEADERS)
        assert response.status_code == 404
