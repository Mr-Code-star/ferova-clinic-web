import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  imports: [MatIcon, MatIconButton, MatButton],
  selector: 'app-chat-header',
  styleUrl: './chat-header.css',
  templateUrl: './chat-header.html',
})
export class ChatHeader {
  @Input() motherName: string = '';
  @Input() patientName: string = '';
  @Input() refreshing: boolean = false;

  @Output() back = new EventEmitter<void>();
  @Output() closeConsultation = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
  onClose() {
    this.closeConsultation.emit();
  }
}
