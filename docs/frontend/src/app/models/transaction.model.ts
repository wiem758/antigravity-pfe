// frontend/src/app/models/transaction.model.ts
// Interfaces TypeScript qui reflètent exactement les schémas Pydantic du MCP

export type TransactionType = 'debit' | 'credit' | 'transfert';
export type TransactionEtat = 'Payé' | 'En attente' | 'Annulé';
export type ModePaiement   = 'Espèce' | 'Chèque' | 'Virement bancaire' | 'Carte bancaire';
export type Devise         = 'TND' | 'EUR' | 'USD';

export interface TransactionData {
  id:               string;
  numero:           string;
  type_transaction: TransactionType;
  montant:          number;
  devise:           Devise;
  etat:             TransactionEtat;
  mode_paiement?:   ModePaiement;
  caisse_id?:       string;
  caisse_nom?:      string;
  client_nom?:      string;
  fournisseur_nom?: string;
  source_nom?:      string;
  destination_nom?: string;
  facture_id?:      string;
  note?:            string;
  created_at?:      string;
}

export interface Caisse {
  id:     string;
  nom:    string;
  devise: Devise;
  solde:  number;
}

// Message affiché dans le chat
export interface ChatMessage {
  role:             'user' | 'assistant';
  content:          string;
  timestamp:        Date;
  transactionData?: TransactionData;
  isError?:         boolean;
}

// Corps envoyé à POST /chat
export interface ChatRequest {
  message:    string;
  session_id: string;
  language?:  string; // Détectée automatiquement (fr, en, ar, ar_TN)
}

// Corps reçu de POST /chat
export interface ChatResponse {
  response:         string;
  session_id:       string;
  transaction_data?: TransactionData;
  tool_called?:     string;
  success:          boolean;
}