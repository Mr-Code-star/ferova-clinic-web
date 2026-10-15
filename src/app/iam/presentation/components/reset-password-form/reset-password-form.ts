import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [FormsModule, MatFormField, MatInput, MatIconButton, MatIcon, MatButton],
  selector: 'app-reset-password-form',
  styleUrl: './reset-password-form.css',
  templateUrl: './reset-password-form.html',
})
export class ResetPasswordForm {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirmPassword = true;

  @Output() submitPassword = new EventEmitter<string>();

  // ============================================
  // REQUISITOS DE SEGURIDAD (dinámicos con signals)
  // ============================================
  readonly hasMinLength = computed(() => this.passwordSignal().length >= 8);
  readonly hasNumber = computed(() => /\d/.test(this.passwordSignal()));
  readonly hasSpecialChar = computed(() => /[@#$!%*?&]/.test(this.passwordSignal()));

  /** Signal interno para que los computed reaccionen a los cambios. */
  private readonly passwordSignal = signal('');

  // Sincronizamos el signal con ngModel
  onPasswordChange(value: string): void {
    this.password = value;
    this.passwordSignal.set(value);
  }

  // ============================================
  // VALIDACIÓN GLOBAL
  // ============================================
  get isValid(): boolean {
    return (
      this.hasMinLength() &&
      this.hasNumber() &&
      this.hasSpecialChar() &&
      this.password === this.confirmPassword
    );
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  // ============================================
  // ACCIONES
  // ============================================
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(): void {
    if (!this.isValid) return;
    this.submitPassword.emit(this.password);
  }
}
