import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginView } from './iam/presentation/views/login-view/login-view';
import { Header } from './shared/presentation/components/header/header';
import { Footer } from './shared/presentation/components/footer/footer';
import { AuthInfo } from './shared/presentation/components/auth-info/auth-info';
import { RegisterForm } from './iam/presentation/components/register-form/register-form';
import { RegisterView } from './iam/presentation/views/register-view/register-view';

@Component({
  imports: [RouterOutlet, LoginView, Header, Footer, AuthInfo, RegisterForm, RegisterView],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ferova-clinic-web');
}
