import {Routes} from '@angular/router';

/**
 * Rutas del módulo de autenticación (IAM).
 */
const loginView = () =>
  import('./views/login-view/login-view').then((m) => m.LoginView);


const registerView = () =>
  import('./views/register-view/register-view').then((m) => m.RegisterView);

/**
 * Rutas del módulo de recuperación de contraseña.
 */
const forgotPasswordView = () =>
  import('./views/password-recovery/forgot-password-view/forgot-password-view')
    .then((m) => m.ForgotPasswordView);

const verifyCodeView = () =>
  import('./views/password-recovery/verify-code-view/verify-code-view')
    .then((m) => m.VerifyCodeView);


const resetPasswordView = () =>
  import('./views/password-recovery/reset-password-view/reset-password-view')
    .then((m) => m.ResetPasswordView);


const baseTitle = 'FerovaClinic';

export const iamRoutes: Routes = [
  {
    path: 'login',
    loadComponent: loginView,
    title: `Iniciar Sesión | ${baseTitle}`,
  },
  {
    path: 'register',
    loadComponent: registerView,
    title: `Crear Cuenta | ${baseTitle}`,
  },
  {
    path: 'forgot-password',
    loadComponent: forgotPasswordView,
    title: `Recuperar Contraseña | ${baseTitle}`,
  },
  {
    path: 'verify-code',
    loadComponent: verifyCodeView,
    title: `Verificar Código | ${baseTitle}`,
  },
  {
    path: 'reset-password',
    loadComponent: resetPasswordView,
    title: `Nueva Contraseña | ${baseTitle}`,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
