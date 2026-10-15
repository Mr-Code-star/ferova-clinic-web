import { Component } from '@angular/core';
import { Header } from '../../../../shared/presentation/components/header/header';
import { RegisterInfo } from '../../../../shared/presentation/components/register-info/register-info';
import { RegisterData, RegisterForm } from '../../components/register-form/register-form';
import { Footer } from '../../../../shared/presentation/components/footer/footer';

@Component({
  imports: [Header, RegisterInfo, RegisterForm, Footer],
  selector: 'app-register-view',
  styleUrl: './register-view.css',
  templateUrl: './register-view.html',
})
export class RegisterView {
  /**
   * Recibe los datos del formulario hijo (register-form)
   * y aquí se decide qué hacer: llamar al servicio de IAM, crear la cuenta, etc.
   */
  onRegister(data: RegisterData): void {
    console.log('Datos de registro recibidos:', data);

    // TODO: Aquí conectarás con tu servicio de IAM:
    // this.iamService.register(data).subscribe({
    //   next: (response) => {
    //     // Redirigir al login o al dashboard
    //   },
    //   error: (err) => {
    //     // Mostrar mensaje de error
    //   }
    // });
  }
}
