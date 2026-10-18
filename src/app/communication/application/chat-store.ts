import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChatApi } from '../infrastructure/chat-api';
import { Message } from '../domain/model/messages.entity';
import { SendMessageCommand } from '../domain/model/send-message.command';

@Injectable({ providedIn: 'root' })
export class ChatStore {
  private readonly api = inject(ChatApi);

  // ============================================
  // ESTADO
  // ============================================
  private readonly messagesSignal = signal<Message[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly sendingSignal = signal<boolean>(false);
  private readonly refreshingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // API Pública
  readonly messages = this.messagesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly sending = this.sendingSignal.asReadonly();
  readonly refreshing = this.refreshingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // ============================================
  // CARGA INICIAL
  // ============================================
  loadMessages(consultationId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getMessages(consultationId).subscribe({
      next: (messages) => {
        this.messagesSignal.set(this.sortBySentAt(messages));
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron cargar los mensajes.');
        this.loadingSignal.set(false);
      }
    });
  }

  // ============================================
  // REFRESH MANUAL (botón)
  // ============================================
  refreshMessages(consultationId: string): void {
    if (this.refreshingSignal() || this.loadingSignal()) return;

    this.refreshingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getMessages(consultationId).subscribe({
      next: (messages) => {
        this.messagesSignal.set(this.sortBySentAt(messages));
        this.refreshingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron actualizar los mensajes.');
        this.refreshingSignal.set(false);
      }
    });
  }

  // ============================================
  // REFRESH SILENCIOSO (polling — no toca spinners)
  // ============================================
  refreshSilently$(consultationId: string): Observable<void> {
    return this.api.getMessages(consultationId).pipe(
      tap({
        next: (messages) => {
          this.messagesSignal.set(this.sortBySentAt(messages));
        },
        error: () => {
          // Silencioso: no queremos spamear errores cada 5s
        }
      })
    ) as unknown as Observable<void>;
  }

  // ============================================
  // ENVÍO DE MENSAJE (Optimistic UI + reconciliación)
  // ============================================
  sendMessage(consultationId: string, content: string): void {
    if (!content.trim() || this.sendingSignal()) return;

    this.sendingSignal.set(true);
    this.errorSignal.set(null);

    const tempId = `temp-${crypto.randomUUID()}`;
    const command = new SendMessageCommand(consultationId, content);

    // 1. Mensaje optimista
    const tempMessage = new Message({
      messageId: tempId,
      senderId: 'nurse-temp',
      senderRole: 'NURSE',
      content: content,
      sentAt: new Date().toISOString()
    });
    this.messagesSignal.update(msgs => [...msgs, tempMessage]);

    // 2. Enviamos y reemplazamos el temporal con el real del backend
    this.api.sendMessage(command).subscribe({
      next: (savedMessage) => {
        this.messagesSignal.update(msgs =>
          msgs.map(m => (m.id === tempId ? savedMessage : m))
        );
        this.sendingSignal.set(false);
      },
      error: () => {
        // 3. Rollback: quitamos el temporal
        this.messagesSignal.update(msgs => msgs.filter(m => m.id !== tempId));
        this.errorSignal.set('No se pudo enviar el mensaje.');
        this.sendingSignal.set(false);
      }
    });
  }

  clear(): void {
    this.messagesSignal.set([]);
    this.errorSignal.set(null);
  }

  // ============================================
  // HELPERS
  // ============================================
  private sortBySentAt(messages: Message[]): Message[] {
    return [...messages].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );
  }
}
