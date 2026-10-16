import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export type UserRole = 'Admin' | 'Nurse';

export interface RegisterData {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string
  dni: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

@Component({
  imports: [
    FormsModule,
    MatIcon,
    MatFormField,
    MatCheckbox,
    MatButton,
    MatInput,
    MatIconButton,
    RouterLink,
  ],
  selector: 'app-register-form',
  styleUrl: './register-form.css',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  // Estado del formulario
  selectedRole: UserRole = 'Admin';
  firstName = '';
  lastName = '';
  dni = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  hidePassword = true;
  hideConfirmPassword = true;

  // Emitimos el evento hacia el padre
  @Output() registerSubmit = new EventEmitter<RegisterData>();
  @Input() loading = false;

  selectRole(role: UserRole): void {
    this.selectedRole = role;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  /** ¿El formulario es válido? */
  get isValid(): boolean {
    return (
      this.firstName.trim().length > 0 &&
      this.lastName.trim().length > 0 &&
      this.isValidEmail(this.email) &&
      this.dni.length === 8 &&
      this.isValidPhone(this.phone) &&
      this.password.length >= 8 &&
      this.password === this.confirmPassword &&
      this.acceptTerms
    );
  }

  onPhoneInput(value: string): void {
    // Quita todo lo que no sea dígito o el prefijo +51
    let digits = value.replace(/\D/g, '');

    // Si empieza con 51, quítalo (para no duplicar)
    if (digits.startsWith('51')) {
      digits = digits.slice(2);
    }

    // Máximo 9 dígitos
    digits = digits.slice(0, 9);

    // Aplica el formato
    this.phone = digits.length > 0 ? `+51 ${digits}` : '';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  private isValidPhone(phone: string): boolean {
    // Formato: +51 9XXXXXXXX (exactamente +51, espacio, 9 dígitos)
    return /^\+51\s\d{9}$/.test(phone.trim());
  }

  onSubmit(): void {
    if (!this.isValid) return;

    this.registerSubmit.emit({
      role: this.selectedRole,
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      dni: this.dni,
      phone: this.phone,
      password: this.password,
      acceptTerms: this.acceptTerms,
    });
  }
}
