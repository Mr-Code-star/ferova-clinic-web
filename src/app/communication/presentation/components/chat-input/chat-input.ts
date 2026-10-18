import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [MatIconButton, MatIcon, MatButton, FormsModule],
  selector: 'app-chat-input',
  styleUrl: './chat-input.css',
  templateUrl: './chat-input.html',
})
export class ChatInput {
  messageText: string = '';

  @Output() sendMessage = new EventEmitter<string>();

  quickReplies = [
    'Separar leche del suplemento (2h)',
    'Ofrecer con jugo de naranja/vitamina C',
    'Signos de alarma pediátrica',
  ];

  @Input() disabled: boolean = false;

  onSend() {
    if (this.disabled) return; // ⬅️ Evita enviar si está deshabilitado

    if (this.messageText.trim()) {
      this.sendMessage.emit(this.messageText.trim());
      this.messageText = '';
    }
  }

  useQuickReply(reply: string) {
    if (this.disabled) return;
    this.messageText = reply;
  }
}
