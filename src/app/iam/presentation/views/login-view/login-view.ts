import { Component } from '@angular/core';
import { AuthInfo } from '../../../../shared/presentation/components/auth-info/auth-info';
import { LoginForm } from '../../components/login-form/login-form';
import { Header } from '../../../../shared/presentation/components/header/header';
import { Footer } from '../../../../shared/presentation/components/footer/footer';

@Component({
  imports: [AuthInfo, LoginForm, Header, Footer],
  selector: 'app-login-view',
  styleUrl: './login-view.css',
  templateUrl: './login-view.html',
})
export class LoginView {
  /**
   * Recibe las credenciales del formulario hijo (login-form)
   * y aquí se decide qué hacer: llamar al servicio de IAM, navegar, etc.
   */
  onLogin(credentials: { dni: string; password: string }): void {
    console.log('Credenciales recibidas:', credentials);

    // TODO: Aquí conectarás con tu servicio de IAM:
    // this.iamService.login(credentials.dni, credentials.password).subscribe({
    //   next: (response) => {
    //     // Guardar token, redirigir al dashboard, etc.
    //   },
    //   error: (err) => {
    //     // Mostrar mensaje de error
    //   }
    // });
  }
}
