// frontend/src/app/chat/chat.component.ts

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgentService } from '../services/agent.service';
import { ChatMessage } from '../models/transaction.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('msgContainer')
  msgContainer!: ElementRef;

  messages: ChatMessage[] = [];

  userInput: string = '';

  isLoading: boolean = false;

  sessionId: string = '';

  quickActions = [
    {
      label: '💼 Solde caisses',
      text: 'Quel est le solde de mes caisses ?'
    },
    {
      label: '📋 Transactions',
      text: 'Liste toutes mes transactions'
    },
    {
      label: '💳 Nouveau débit',
      text: 'Payer fournisseur 500 TND'
    },
    {
      label: '💰 Nouveau crédit',
      text: 'Encaisser 1000 TND'
    },
    {
      label: '🔄 Transfert',
      text: 'Transférer 2000 TND'
    }
  ];

  private shouldScroll: boolean = false;

  constructor(
    private agentService: AgentService
  ) {}

  ngOnInit(): void {

    this.sessionId =
      this.agentService.generateSessionId();

    this.addAssistantMessage(
`Bonjour 👋
Je suis votre assistant DWEXO 💼`
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  async sendMessage(): Promise<void> {

    const msg = this.userInput.trim();

    if (!msg || this.isLoading) {
      return;
    }

    this.messages.push({
      role: 'user',
      content: msg,
      timestamp: new Date()
    });

    this.userInput = '';

    this.isLoading = true;
    this.shouldScroll = true;

    try {

      const res =
        await this.agentService.sendMessage(
          msg,
          this.sessionId
        );

      this.messages.push({
        role: 'assistant',
        content: res.response,
        timestamp: new Date(),
        transactionData: res.transaction_data
      });

    } catch (err: any) {

      const errorMessage = 
        err?.message || 'Une erreur est survenue';

      this.messages.push({
        role: 'assistant',
        content: '❌ ' + errorMessage,
        timestamp: new Date(),
        isError: true
      });

    } finally {

      this.isLoading = false;
      this.shouldScroll = true;

    }
  }

  onKeyDown(event: KeyboardEvent): void {

    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  useQuick(text: string): void {
    this.userInput = text;
    this.sendMessage();
  }

  private addAssistantMessage(
    content: string
  ): void {

    this.messages.push({
      role: 'assistant',
      content,
      timestamp: new Date()
    });

    this.shouldScroll = true;
  }

  private scrollToBottom(): void {

    try {

      const el =
        this.msgContainer?.nativeElement;

      if (el) {
        el.scrollTop = el.scrollHeight;
      }

    } catch {}

  }

}
