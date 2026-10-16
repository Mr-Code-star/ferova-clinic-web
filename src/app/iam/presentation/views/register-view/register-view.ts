import { Component, inject } from '@angular/core';
import { Header } from '../../../../shared/presentation/components/header/header';
import { RegisterInfo } from '../../../../shared/presentation/components/register-info/register-info';
import { RegisterData, RegisterForm } from '../../components/register-form/register-form';
import { Footer } from '../../../../shared/presentation/components/footer/footer';
import { AuthStore } from '../../../application/auth-store';
import { SignUpCommand } from '../../../domain/model/sign-up.command';
import { LoginForm } from '../../components/login-form/login-form';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [Header, RegisterInfo, RegisterForm, Footer, MatIcon],
  selector: 'app-register-view',
  styleUrl: './register-view.css',
  templateUrl: './register-view.html',
})
export class RegisterView {
  private readonly authStore = inject(AuthStore);

  readonly loading = this.authStore.loading;
  readonly error = this.authStore.error;

  /**
   * Recibe los datos del formulario hijo (register-form)
   * y aquí se decide qué hacer: llamar al servicio de IAM, crear la cuenta, etc.
   */
  onRegister(data: RegisterData): void {
    const command = new SignUpCommand(
      data.firstName,
      data.lastName,
      data.password,
      data.email,
      data.dni,
      data.phone,
      data.role,
    );
    this.authStore.signUp(command);
  }

  onClearError(): void {
    this.authStore.clearError();
  }
}
