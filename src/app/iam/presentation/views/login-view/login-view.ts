import { Component, inject } from '@angular/core';
import { AuthInfo } from '../../../../shared/presentation/components/auth-info/auth-info';
import { LoginForm } from '../../components/login-form/login-form';
import { Header } from '../../../../shared/presentation/components/header/header';
import { Footer } from '../../../../shared/presentation/components/footer/footer';
import { AuthStore } from '../../../application/auth-store';
import { SignInCommand } from '../../../domain/model/sign-in.command';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [AuthInfo, LoginForm, Header, Footer, MatIcon],
  selector: 'app-login-view',
  styleUrl: './login-view.css',
  templateUrl: './login-view.html',
})
export class LoginView {
  private readonly authStore = inject(AuthStore);

  /** Estado expuesto a la vista */
  readonly loading = this.authStore.loading;
  readonly error = this.authStore.error;

  /**
   * Recibe las credenciales del formulario hijo (login-form)
   * y las envía al AuthStore para autenticar.
   */
  onLogin(credentials: { dni: string; password: string }): void {
    const command = new SignInCommand(credentials.dni, credentials.password);
    this.authStore.signIn(command);
  }

  onClearError(): void {
    this.authStore.clearError();
  }
}
