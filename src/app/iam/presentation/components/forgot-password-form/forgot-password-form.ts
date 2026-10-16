import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [FormsModule, MatFormField, MatInput, MatIcon, MatButton],
  selector: 'app-forgot-password-form',
  styleUrl: './forgot-password-form.css',
  templateUrl: './forgot-password-form.html',
})
export class ForgotPasswordForm {
  email = '';

  @Output() submitEmail = new EventEmitter<string>();
  @Input() loading = false;

  /** Validación simple de email */
  get isValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  onSubmit(): void {
    if (!this.isValid) return;
    this.submitEmail.emit(this.email);
  }
}
