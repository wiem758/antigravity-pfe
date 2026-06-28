# tests/integration/test_transactions.py
#
# ============================================================
# RÔLE DE CE FICHIER
# ============================================================
# Tests d'intégration des 3 opérations de transaction DWEXO.
# Simule des scénarios réels tirés de vos captures d'écran.
#
# SCÉNARIO 1 : Un fournisseur étranger est payé en EUR (Débit)
# SCÉNARIO 2 : Un client paie sa facture en TND (Crédit)
# SCÉNARIO 3 : Virement interne entre deux caisses (Transfert)
# SCÉNARIO 4 : Liste et filtrage des transactions
# SCÉNARIO 5 : Cas d'erreurs (solde insuffisant, ID inconnu...)
#
# Lancer : pytest tests/integration/test_transactions.py -v
# ============================================================

import pytest
from fastapi.testclient import TestClient
from mcp_server.main import app

client = TestClient(app)
AUTH = {"X-API-Key": "dev-secret-key"}


# ============================================================
# SCÉNARIO 1 — DÉBIT : paiement d'un fournisseur en EUR
# ============================================================
# Reproduit la transaction trx-003 visible dans Image 2 :
# - 1 997,000 EUR débité de la Caisse Espèce EUR
# - Fournisseur Paris, Bon de commande BC-2026-001

class TestDebit:
    """Tests du formulaire TRANSACTION[DEBIT] (Image 4)."""

    def test_creer_debit_fournisseur_eur(self):
        """
        Scénario : payer un fournisseur étranger 500 EUR en espèce.
        Reproduit le formulaire DÉBIT avec tous ses champs.
        """
        payload = {
            # Panneau gauche du formulaire DÉBIT (Image 4)
            "source_destination": "Caisse",
            "caisse_id": "caisse-002",           # Caisse Espèce EUR
            "montant": 500.0,
            "mode_paiement": "Espèce",            # Valeur par défaut visible dans DWEXO
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "EUR",

            # Panneau droit du formulaire DÉBIT (Image 4)
            "categorie_depense": "Achats",
            "fournisseur_id": "fou-001",
            "fournisseur_nom": "Fournisseur Paris",
            "facture_id": "FAC-ACH-002",
            "bon_commande": "BC-2026-005",
            "note": "Paiement matériel bureau",
        }

        response = client.post(
            "/tools/transactions/debit",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 201, response.json()
        body = response.json()
        assert body["success"] is True

        data = body["data"]
        # Vérifier tous les champs du formulaire
        assert data["type_transaction"] == "debit"
        assert data["montant"] == 500.0
        assert data["devise"] == "EUR"
        assert data["etat"] == "Payé"
        assert data["mode_paiement"] == "Espèce"
        assert data["caisse_id"] == "caisse-002"
        assert data["fournisseur_nom"] == "Fournisseur Paris"
        assert data["facture_id"] == "FAC-ACH-002"
        assert data["bon_commande"] == "BC-2026-005"
        # Le numéro est généré automatiquement
        assert data["numero"].startswith("TRX-2026-")
        # L'ID est généré automatiquement
        assert data["id"].startswith("trx-")
        # Champs crédit doivent être None dans un débit
        assert data["client_id"] is None
        assert data["rib"] is None

    def test_debit_solde_insuffisant(self):
        """
        Règle métier : on ne peut pas débiter plus que le solde de la caisse.
        Doit retourner HTTP 400 avec un message clair.
        """
        payload = {
            "source_destination": "Caisse",
            "caisse_id": "caisse-002",   # Solde initial 5000 EUR
            "montant": 999999.0,          # Montant volontairement trop élevé
            "mode_paiement": "Espèce",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "EUR",
        }

        response = client.post(
            "/tools/transactions/debit",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 400
        assert "insuffisant" in response.json()["detail"].lower()

    def test_debit_caisse_inexistante(self):
        """Caisse inconnue → HTTP 400."""
        payload = {
            "source_destination": "Caisse",
            "caisse_id": "caisse-999",   # N'existe pas
            "montant": 100.0,
            "mode_paiement": "Espèce",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "TND",
        }

        response = client.post(
            "/tools/transactions/debit",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 400
        assert "introuvable" in response.json()["detail"].lower()

    def test_debit_montant_negatif_refuse(self):
        """Montant négatif ou zéro → HTTP 422 (validation Pydantic)."""
        payload = {
            "source_destination": "Caisse",
            "caisse_id": "caisse-001",
            "montant": -100.0,           # Invalide — doit être > 0
            "mode_paiement": "Espèce",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "TND",
        }
        response = client.post(
            "/tools/transactions/debit",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 422

    def test_debit_sans_caisse_refuse(self):
        """caisse_id absent quand source = Caisse → HTTP 422."""
        payload = {
            "source_destination": "Caisse",
            # caisse_id manquant intentionnellement
            "montant": 100.0,
            "mode_paiement": "Espèce",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "TND",
        }
        response = client.post(
            "/tools/transactions/debit",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 422


# ============================================================
# SCÉNARIO 2 — CRÉDIT : encaissement d'un client
# ============================================================
# Reproduit les transactions trx-001 et trx-002 visibles dans Image 2 :
# + 1 000,000 TND et + 2 000,000 TND encaissés en espèce

class TestCredit:
    """Tests du formulaire TRANSACTION[CREDIT] (Image 3)."""

    def test_creer_credit_client_tnd(self):
        """
        Scénario : encaisser 1500 TND d'un client en espèce.
        Reproduit le formulaire CRÉDIT avec tous ses champs.
        """
        payload = {
            # Panneau gauche du formulaire CRÉDIT (Image 3)
            "source_destination": "Caisse",
            "caisse_id": "caisse-001",           # Caisse Espèce TND
            "montant": 1500.0,
            "mode_paiement": "Espèce",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "TND",

            # Panneau droit du formulaire CRÉDIT (Image 3)
            "client_id": "cli-001",
            "client_nom": "Dupont SA",
            "rib": "TN59-0000-0000-0000-0000-0000",
            "facture_id": "FAC-2026-010",
            "bon_commande": "BC-VENTE-001",
            "note": "Règlement facture mars 2026",
        }

        response = client.post(
            "/tools/transactions/credit",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 201, response.json()
        body = response.json()
        assert body["success"] is True

        data = body["data"]
        assert data["type_transaction"] == "credit"
        assert data["montant"] == 1500.0
        assert data["devise"] == "TND"
        assert data["etat"] == "Payé"
        assert data["caisse_id"] == "caisse-001"
        assert data["client_nom"] == "Dupont SA"
        assert data["facture_id"] == "FAC-2026-010"
        assert data["rib"] == "TN59-0000-0000-0000-0000-0000"
        assert data["numero"].startswith("TRX-2026-")
        # Champs débit doivent être None dans un crédit
        assert data["fournisseur_id"] is None
        assert data["equipement_id"] is None

    def test_credit_avec_cheque_et_reference(self):
        """
        Scénario : encaisser un chèque avec numéro de référence
        et bordereau de remise (champs visibles dans Image 3).
        """
        payload = {
            "source_destination": "Caisse",
            "caisse_id": "caisse-001",
            "montant": 3000.0,
            "mode_paiement": "Chèque",
            "date_reglement": "2026-05-22",
            "etat": "En attente",              # En attente d'encaissement du chèque
            "devise": "TND",
            # Champs spécifiques au chèque
            "numero_reference": "CHQ-00123456", # Numéro/référence visible dans Image 3
            "porteur": "Mohammed Amara",
            "bordereau_remise": "BR-2026-001",
            "client_id": "cli-002",
            "client_nom": "Martin SRL",
        }

        response = client.post(
            "/tools/transactions/credit",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 201
        data = response.json()["data"]
        assert data["mode_paiement"] == "Chèque"
        assert data["etat"] == "En attente"
        assert data["numero_reference"] == "CHQ-00123456"
        assert data["porteur"] == "Mohammed Amara"

    def test_credit_plusieurs_factures(self):
        """
        Scénario : un crédit couvre plusieurs factures
        (case à cocher 'Transaction à plusieurs factures' visible dans Image 3).
        """
        payload = {
            "source_destination": "Caisse",
            "caisse_id": "caisse-001",
            "montant": 5000.0,
            "mode_paiement": "Virement bancaire",
            "date_reglement": "2026-05-22",
            "etat": "Payé",
            "devise": "TND",
            "client_id": "cli-003",
            "transaction_plusieurs_factures": True,  # Case cochée
        }

        response = client.post(
            "/tools/transactions/credit",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 201
        assert response.json()["data"]["transaction_plusieurs_factures"] is True


# ============================================================
# SCÉNARIO 3 — TRANSFERT entre caisses
# ============================================================
# Reproduit l'utilisation du formulaire TRANSFERT (Image 2) :
# "TRANSFERT ENTRE CAISSES / COMPTES"

class TestTransfert:
    """Tests du formulaire TRANSFERT (Image 2)."""

    def test_transfert_entre_deux_caisses(self):
        """
        Scénario : transférer 1000 TND de la Caisse Principale
        vers la Caisse Espèce TND.
        Reproduit exactement le formulaire Image 2.
        """
        payload = {
            # Champ "De" (source) dans le formulaire
            "source_id": "caisse-003",           # Caisse Principale
            # Champ "Vers" (destination) dans le formulaire
            "destination_id": "caisse-001",      # Caisse Espèce TND
            # Champ Montant avec devise TND
            "montant": 1000.0,
            "devise": "TND",
            # Champ Date
            "date_transfert": "2026-05-22",
            # Champ Note (optionnel) — "Remarque..." dans le formulaire
            "note": "Approvisionnement caisse principale",
        }

        response = client.post(
            "/tools/transactions/transfert",
            json=payload,
            headers=AUTH
        )

        assert response.status_code == 201, response.json()
        body = response.json()
        assert body["success"] is True

        data = body["data"]
        assert data["type_transaction"] == "transfert"
        assert data["montant"] == 1000.0
        assert data["devise"] == "TND"
        assert data["source_id"] == "caisse-003"
        assert data["destination_id"] == "caisse-001"
        assert data["note"] == "Approvisionnement caisse principale"
        assert data["etat"] == "Payé"  # Un transfert est toujours immédiatement Payé
        assert data["numero"].startswith("TRF-2026-")  # Numéro commence par TRF

    def test_transfert_source_egale_destination_refuse(self):
        """
        Règle métier : source ≠ destination.
        Le formulaire DWEXO ne devrait pas permettre ça.
        """
        payload = {
            "source_id": "caisse-001",
            "destination_id": "caisse-001",  # Même caisse — invalide
            "montant": 500.0,
            "devise": "TND",
            "date_transfert": "2026-05-22",
        }
        response = client.post(
            "/tools/transactions/transfert",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 422  # Validation Pydantic

    def test_transfert_solde_insuffisant(self):
        """Solde source insuffisant → HTTP 400."""
        payload = {
            "source_id": "caisse-001",
            "destination_id": "caisse-003",
            "montant": 9999999.0,   # Montant impossible
            "devise": "TND",
            "date_transfert": "2026-05-22",
        }
        response = client.post(
            "/tools/transactions/transfert",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 400
        assert "insuffisant" in response.json()["detail"].lower()

    def test_transfert_destination_inexistante(self):
        """Destination inconnue → HTTP 400."""
        payload = {
            "source_id": "caisse-001",
            "destination_id": "caisse-999",  # N'existe pas
            "montant": 100.0,
            "devise": "TND",
            "date_transfert": "2026-05-22",
        }
        response = client.post(
            "/tools/transactions/transfert",
            json=payload,
            headers=AUTH
        )
        assert response.status_code == 400


# ============================================================
# SCÉNARIO 4 — LISTE et FILTRAGE
# ============================================================
# Reproduit la vue principale Transactions (Image 1)

class TestListTransactions:
    """Tests de la vue liste et des filtres DWEXO (Image 1)."""

    def test_liste_toutes_transactions(self):
        """Sans filtre → retourne toutes les transactions (au moins les 4 mockées)."""
        response = client.post(
            "/tools/transactions/list",
            json={},
            headers=AUTH
        )
        assert response.status_code == 200
        body = response.json()
        assert body["success"] is True
        assert body["total"] >= 4  # Au moins les 4 transactions mockées

    def test_filtre_par_debit_seulement(self):
        """Filtre DÉBIT (bouton rouge dans Image 1) → uniquement les débits."""
        response = client.post(
            "/tools/transactions/list",
            json={"type_transaction": "debit"},
            headers=AUTH
        )
        assert response.status_code == 200
        items = response.json()["data"]["items"]
        for item in items:
            assert item["type_transaction"] == "debit"

    def test_filtre_par_credit_seulement(self):
        """Filtre CRÉDIT → uniquement les crédits."""
        response = client.post(
            "/tools/transactions/list",
            json={"type_transaction": "credit"},
            headers=AUTH
        )
        items = response.json()["data"]["items"]
        for item in items:
            assert item["type_transaction"] == "credit"

    def test_filtre_par_caisse_tnd(self):
        """Filtre par Caisse Espèce TND → transactions de cette caisse."""
        response = client.post(
            "/tools/transactions/list",
            json={"caisse_id": "caisse-001"},
            headers=AUTH
        )
        assert response.status_code == 200
        items = response.json()["data"]["items"]
        for item in items:
            assert item.get("caisse_id") == "caisse-001"

    def test_filtre_par_annee_2026(self):
        """Filtre par année 2026 (sélecteur visible dans Image 1)."""
        response = client.post(
            "/tools/transactions/list",
            json={"annee": 2026},
            headers=AUTH
        )
        assert response.status_code == 200
        assert response.json()["total"] >= 4

    def test_filtre_par_etat_paye(self):
        """Filtre par état 'Payé'."""
        response = client.post(
            "/tools/transactions/list",
            json={"etat": "Payé"},
            headers=AUTH
        )
        items = response.json()["data"]["items"]
        for item in items:
            assert item["etat"] == "Payé"

    def test_recherche_rapide_par_client(self):
        """Recherche rapide par nom de client (barre de recherche Image 1)."""
        response = client.post(
            "/tools/transactions/list",
            json={"recherche": "Dupont"},
            headers=AUTH
        )
        assert response.status_code == 200
        items = response.json()["data"]["items"]
        for item in items:
            found = "dupont" in str(item.get("client_nom", "")).lower()
            assert found

    def test_pagination_20_par_page(self):
        """Pagination : 20 éléments par page (valeur visible en bas de Image 1)."""
        response = client.post(
            "/tools/transactions/list",
            json={"page": 1, "page_size": 20},
            headers=AUTH
        )
        data = response.json()["data"]
        assert data["page_size"] == 20
        assert len(data["items"]) <= 20


# ============================================================
# SCÉNARIO 5 — RÉCUPÉRATION et AUTHENTIFICATION
# ============================================================

class TestGetAndAuth:
    """Tests de récupération par ID et de sécurité."""

    def test_get_transaction_existante(self):
        """Récupérer une transaction mockée par son ID."""
        response = client.get(
            "/tools/transactions/trx-001",
            headers=AUTH
        )
        assert response.status_code == 200
        data = response.json()["data"]
        assert data["id"] == "trx-001"
        assert data["montant"] == 1000.0
        assert data["client_nom"] == "Dupont SA"

    def test_get_transaction_inexistante(self):
        """ID inconnu → HTTP 404."""
        response = client.get(
            "/tools/transactions/trx-999",
            headers=AUTH
        )
        assert response.status_code == 404

    def test_get_caisses_avec_soldes(self):
        """Récupérer la liste des caisses et leurs soldes."""
        response = client.get(
            "/tools/transactions/caisses/list",
            headers=AUTH
        )
        assert response.status_code == 200
        caisses = response.json()["data"]
        assert len(caisses) == 3
        noms = [c["nom"] for c in caisses]
        assert "Caisse Espèce TND" in noms

    def test_sans_cle_api_refuse(self):
        """Sans clé API → toutes les routes retournent 401."""
        r1 = client.post("/tools/transactions/debit", json={})
        r2 = client.post("/tools/transactions/credit", json={})
        r3 = client.post("/tools/transactions/transfert", json={})
        assert r1.status_code == 401
        assert r2.status_code == 401
        assert r3.status_code == 401
