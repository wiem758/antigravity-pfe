// chat.component.ts
//
// Fonctionnalités clés :
//  1. Interface dark mode style ChatGPT
//  2. Détection automatique de l'intention (débit/crédit/transfert)
//     → L'utilisateur dit juste "payer Dupont 500 TND" et l'agent comprend
//  3. Multilingue : arabe, français, anglais, dialecte tunisien
//  4. Sidebar avec historique des sessions
//  5. Carte transaction affichée après chaque opération

import {
  Component, OnInit, AfterViewChecked,
  ViewChild, ElementRef
} from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { ChatMessage, TransactionData } from '../models/transaction.model';

// ── Types locaux ────────────────────────────────────
interface Session {
  id:        string;
  title:     string;
  messages:  ChatMessage[];
  createdAt: Date;
}

interface Suggestion {
  icon:  string;
  title: string;
  desc:  string;
  text:  string;
}

interface QuickChip {
  label: string;
  text:  string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl:    './chat.component.scss',
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('msgContainer') msgContainer!: ElementRef<HTMLElement>;
  @ViewChild('inputEl')       inputEl!:       ElementRef<HTMLTextAreaElement>;

  // ── État principal ────────────────────────────────
  messages:        ChatMessage[] = [];
  userInput:       string        = '';
  isLoading:       boolean       = false;
  inputFocused:    boolean       = false;
  sidebarOpen:     boolean       = true;
  currentSessionId: string       = '';
  sessions:        Session[]     = [];

  // ── Suggestions d'accueil (style ChatGPT) ─────────
  // Couvrent tous les cas DWEXO + multilingue
  suggestions: Suggestion[] = [
    {
      icon: '💳',
      title: 'Payer un fournisseur',
      desc: 'Enregistrer un débit en espèces ou virement',
      text: 'Payer un fournisseur 500 TND en espèce',
    },
    {
      icon: '💰',
      title: 'Encaisser un client',
      desc: 'Créditer une caisse après encaissement',
      text: 'Encaisser 2000 TND du client Dupont SA',
    },
    {
      icon: '🔄',
      title: 'Transférer des fonds',
      desc: 'Déplacer de l\'argent entre caisses',
      text: 'Virer 1000 TND vers la caisse principale',
    },
    {
      icon: '📋',
      title: 'Consulter l\'historique',
      desc: 'Voir les transactions du mois en cours',
      text: 'Afficher toutes mes transactions du mois',
    },
    {
      icon: '💼',
      title: 'Solde des caisses',
      desc: 'Demander en dialecte tunisien',
      text: 'صراحة شحال عندنا فالصندوق ؟',
    },
    {
      icon: '🏦',
      title: 'Unpaid invoices',
      desc: 'Request in English',
      text: 'Show me all unpaid invoices',
    },
  ];

  // ── Raccourcis rapides ────────────────────────────
  quickChips: QuickChip[] = [
    { label: 'Solde caisses',  text: 'Quel est le solde de mes caisses ?' },
    { label: 'Transactions',   text: 'Liste mes transactions' },
    { label: 'Nouveau débit',  text: 'Faire un débit' },
    { label: 'Nouveau crédit', text: 'Faire un crédit' },
    { label: 'Transfert',      text: 'Faire un transfert' },
  ];

  // ── Placeholder rotatif multilingue ──────────────
  private placeholders = [
    'Décrivez votre opération financière...',
    'اكتب طلبك هنا...',
    'Type your request in any language...',
    'وصف العملية المالية...',
    'قل لي شنية تحب تعمل...',
  ];
  private phIndex   = 0;
  placeholder       = this.placeholders[0];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.newChat();
    this._rotatePlaceholder();
  }

  ngAfterViewChecked(): void {
    this._scrollToBottom();
  }

  // ══════════════════════════════════════════════════
  // GESTION DES SESSIONS
  // ══════════════════════════════════════════════════

  newChat(): void {
    // Sauvegarder la session actuelle si elle a des messages
    if (this.messages.length > 0) {
      const existing = this.sessions.find(s => s.id === this.currentSessionId);
      if (existing) existing.messages = [...this.messages];
    }

    this.currentSessionId = this.agentService.generateSessionId();
    this.messages = [];
  }

  loadSession(session: Session): void {
    this.currentSessionId = session.id;
    this.messages = [...session.messages];
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  // Historique groupé par date
  get todaySessions(): Session[] {
    const today = new Date().toDateString();
    return this.sessions.filter(s => s.createdAt.toDateString() === today);
  }

  get olderSessions(): Session[] {
    const today = new Date().toDateString();
    return this.sessions.filter(s => s.createdAt.toDateString() !== today);
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }

  // ══════════════════════════════════════════════════
  // ENVOI DE MESSAGE
  // ══════════════════════════════════════════════════

  async send(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.userInput = '';
    this.autoResize();

    // Ajouter message utilisateur
    this.messages.push({
      role:      'user',
      content:   text,
      timestamp: new Date(),
    });

    this.isLoading = true;

    try {
      const res = await this.agentService.sendMessage(text, this.currentSessionId);

      this.messages.push({
        role:            'assistant',
        content:         res.response,
        timestamp:       new Date(),
        transactionData: res.transaction_data,
      });

      // Sauvegarder / créer la session dans l'historique
      this._saveSession(text);

    } catch (err: any) {
      this.messages.push({
        role:      'assistant',
        content:   '❌ ' + (err.message || 'Erreur de connexion'),
        timestamp: new Date(),
        isError:   true,
      });
    } finally {
      this.isLoading = false;
      setTimeout(() => this.inputEl?.nativeElement?.focus(), 50);
    }
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
    this.autoResize();
  }

  useSuggestion(s: Suggestion): void {
    this.userInput = s.text;
    this.send();
  }

  useChip(q: QuickChip): void {
    this.userInput = q.text;
    this.send();
  }

  // ══════════════════════════════════════════════════
  // PRIVÉ — utilitaires
  // ══════════════════════════════════════════════════

  private _saveSession(firstMessage: string): void {
    const existing = this.sessions.find(s => s.id === this.currentSessionId);
    if (existing) {
      existing.messages = [...this.messages];
    } else {
      // Titre = les 40 premiers caractères du premier message
      const title = firstMessage.length > 40
        ? firstMessage.slice(0, 40) + '…'
        : firstMessage;

      this.sessions.unshift({
        id:        this.currentSessionId,
        title,
        messages:  [...this.messages],
        createdAt: new Date(),
      });
    }
  }

  private _scrollToBottom(): void {
    try {
      const el = this.msgContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  autoResize(event?: Event): void {
    const el = this.inputEl?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }

  private _rotatePlaceholder(): void {
    setInterval(() => {
      this.phIndex = (this.phIndex + 1) % this.placeholders.length;
      this.placeholder = this.placeholders[this.phIndex];
    }, 3500);
  }
}