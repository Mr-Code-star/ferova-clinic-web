import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Message } from '../../../domain/model/messages.entity';


@Component({
  imports: [MatIcon],
  selector: 'app-chat-messages',
  styleUrl: './chat-messages.css',
  templateUrl: './chat-messages.html',
})
export class ChatMessages implements OnChanges {
  @Input() messages: Message[] = [];

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      // Hacemos scroll al final cuando llegan mensajes nuevos
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
