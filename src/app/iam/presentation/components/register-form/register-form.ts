import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton, MatIconButton } from '@angular/material/button';

export type UserRole = 'ADMIN' | 'NURSE';

export interface RegisterData {
  role: UserRole;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

@Component({
  imports: [FormsModule, MatIcon, MatFormField, MatCheckbox, MatButton, MatInput, MatIconButton],
  selector: 'app-register-form',
  styleUrl: './register-form.css',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  // Estado del formulario
  selectedRole: UserRole = 'ADMIN';
  firstName = '';
  lastName = '';
  dni = '';
  phone = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  hidePassword = true;
  hideConfirmPassword = true;

  // Emitimos el evento hacia el padre
  @Output() registerSubmit = new EventEmitter<RegisterData>();

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
      this.dni.length === 8 &&
      this.phone.length >= 9 &&
      this.password.length >= 8 &&
      this.password === this.confirmPassword &&
      this.acceptTerms
    );
  }

  onSubmit(): void {
    if (!this.isValid) return;

    this.registerSubmit.emit({
      role: this.selectedRole,
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      dni: this.dni,
      phone: this.phone,
      password: this.password,
      acceptTerms: this.acceptTerms,
    });
  }
}
