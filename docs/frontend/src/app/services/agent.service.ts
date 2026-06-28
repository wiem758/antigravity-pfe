// frontend/src/app/services/agent.service.ts
//
// RÔLE : Service Angular injectable qui envoie les messages
// de l'utilisateur à l'API agent FastAPI (port 8000).
// Gère les sessions, les erreurs HTTP et retourne les réponses typées.
// Support multilingue (FR, EN, AR, dialecte tunisien)

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChatRequest, ChatResponse, ChatMessage } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class AgentService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Génère un identifiant de session unique par conversation
  generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  }

  // Détecte la langue du message (FR, EN, AR, dialecte tunisien)
  private detectLanguage(message: string): string {
    // Caractères arabes
    if (/[\u0600-\u06FF]/.test(message)) {
      return message.includes('شنية') || message.includes('متاعك') ? 'ar_TN' : 'ar';
    }
    // Détection basique de l'anglais
    if (message.toLowerCase().match(/\b(paid|received|transfer|invoice|balance)\b/i)) {
      return 'en';
    }
    // Français par défaut
    return 'fr';
  }

  // Envoie un message à l'agent et retourne sa réponse
  // L'agent détecte automatiquement le type de transaction (débit/crédit/transfert)
  async sendMessage(message: string, sessionId: string): Promise<ChatResponse> {
    const language = this.detectLanguage(message);
    const body: ChatRequest = { 
      message, 
      session_id: sessionId,
      language // Passe la langue détectée au backend
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      const response = await firstValueFrom(
        this.http.post<ChatResponse>(`${this.apiUrl}/chat`, body, { headers })
      );
      
      // Assurez-vous que la réponse est un succès
      if (!response.success) {
        throw new Error(response.response || 'Erreur du serveur');
      }
      
      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 0:   throw new Error('🔌 Serveur inaccessible. Assurez-vous que le backend DWEXO tourne sur le port 8000.');
          case 401: throw new Error('🔐 Non autorisé. Vérifiez vos identifiants.');
          case 422: throw new Error('⚠️ Données invalides. Vérifiez votre requête.');
          case 500: throw new Error('💥 Erreur serveur. Réessayez plus tard.');
          default:  throw new Error(`❌ Erreur ${error.status} : ${error.message}`);
        }
      }
      throw error;
    }
  }

  // Récupère l'historique d'une session (pour rechargement de page)
  async getSessionHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ history: ChatMessage[] }>(`${this.apiUrl}/sessions/${sessionId}`)
      );
      return res.history;
    } catch { 
      return []; 
    }
  }
}