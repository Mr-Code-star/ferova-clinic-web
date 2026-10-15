import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    MatIcon,
    MatInput,
    MatButton,
    RouterLink,
    MatIconButton,
  ],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  // Estado del formulario
  dni: string = '';
  password: string = '';
  hidePassword: boolean = true;

  // Emitimos el evento hacia el componente padre (login page)
  @Output() loginSubmit = new EventEmitter<{ dni: string; password: string }>();

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    // Validación básica antes de emitir
    if (this.dni.length !== 8 || !this.password) {
      return;
    }
    this.loginSubmit.emit({
      dni: this.dni,
      password: this.password,
    });
  }
}
