import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ChatHeader } from '../../components/chat-header/chat-header';
import { ChatMessages } from '../../components/chat-messages/chat-messages';
import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatStore } from '../../../application/chat-store';
import { CommunicationStore } from '../../../application/communication.store';
import { CommunicationApi } from '../../../infrastructure/communication-api';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmCloseConsultation,
  DialogData,
} from '../../components/confirm-close-consultation/confirm-close-consultation';

@Component({
  imports: [ChatHeader, ChatMessages, ChatInput],
  selector: 'app-nurse-chat-view',
  styleUrl: './nurse-chat-view.css',
  templateUrl: './nurse-chat-view.html',
})
export class NurseChatView implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly chatStore = inject(ChatStore);
  private readonly communicationStore = inject(CommunicationStore);
  private readonly communicationApi = inject(CommunicationApi)
  private readonly dialog = inject(MatDialog);

  readonly messages = this.chatStore.messages;
  readonly loading = this.chatStore.loading;
  readonly sending = this.chatStore.sending;
  readonly refreshing = this.chatStore.refreshing;
  readonly error = this.chatStore.error;

  consultationId: string = '';
  readonly activeConsultation = this.communicationStore.activeConsultation;

  private pollingSub?: Subscription;
  private readonly POLL_MS = 5000;

  ngOnInit(): void {
    this.consultationId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.consultationId) return;

    this.communicationStore.setActiveConsultation(this.consultationId);
    this.chatStore.loadMessages(this.consultationId);
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
    this.chatStore.clear();
  }

  onBack() {
    this.router.navigate(['/nurse/consultations']);
  }

  onRefresh() {
    if (this.consultationId) {
      this.chatStore.refreshMessages(this.consultationId);
    }
  }

  onCloseConsultation(): void {
    const patientName = this.activeConsultation()?.patientName || 'el paciente';

    const dialogRef = this.dialog.open(ConfirmCloseConsultation, {
      width: '400px',
      disableClose: true, // Obliga al usuario a elegir una opción
      data: { patientName } as DialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.executeCloseConsultation();
      }
    });
  }

  private executeCloseConsultation(): void {
    this.communicationApi.closeConsultation(this.consultationId).subscribe({
      next: () => {
        // Si se cierra con éxito, volvemos a la bandeja y recargamos la lista
        this.communicationStore.loadConsultations('');
        this.communicationStore.removeConsultation(this.consultationId);
        this.router.navigate(['/nurse/consultations']);
      },
      error: (err) => {
        console.error('Error closing consultation:', err);
        alert('No se pudo cerrar la consulta. Intenta de nuevo.');
      }
    });
  }

  onSendMessage(text: string) {
    if (!this.consultationId) return;
    this.chatStore.sendMessage(this.consultationId, text);
  }

  private startPolling(): void {
    this.pollingSub = interval(this.POLL_MS)
      .pipe(
        filter(() => !this.chatStore.sending() && !this.chatStore.refreshing()),
        switchMap(() => this.chatStore.refreshSilently$(this.consultationId))
      )
      .subscribe();
  }
}
