import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IamApi } from '../infrastructure/iam-api';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { decodeJwtPayload, extractStringClaim } from '../../shared/infrastructure/jwt-helper';
import { IamStore } from './iam-store';

const TOKEN_KEY = 'ferova_token';
const ROLE_KEY = 'ferova_role';
const EMAIL_KEY = 'ferova_email';
const USER_ID_KEY = 'ferova_user_id';
const ALLOWED_ROLES = ['Admin', 'Nurse'];

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private readonly iamApi = inject(IamApi);
  private readonly router = inject(Router);
  private readonly iamStore = inject(IamStore);

  // Estado
  private readonly isSignedInSignal = signal<boolean>(false);
  private readonly currentUsernameSignal = signal<string | null>(null);
  private readonly currentUserIdSignal = signal<number | null>(null);
  private readonly roleSignal = signal<string | null>(localStorage.getItem(ROLE_KEY));
  private readonly emailSignal = signal<string | null>(localStorage.getItem(EMAIL_KEY));
  private readonly userIdSignal = signal<string | null>(localStorage.getItem(USER_ID_KEY));
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // API pública (readonly)
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();


  // ============================================
  // SIGN IN
  // ============================================
  signIn(command: SignInCommand): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.signIn(command).subscribe({
      next: (resource) => {
        // 1️ Decodificar el JWT
        const payload = decodeJwtPayload(resource.token);
        if (!payload) {
          this.errorSignal.set('Token inválido');
          this.loadingSignal.set(false);
          return;
        }

        // 2 Extraer los claims (manejando arrays y strings)
        const userId = extractStringClaim(payload.id ?? payload.sub);
        const email = extractStringClaim(payload.email);
        const role = extractStringClaim(payload.role);

        if (!role) {
          this.errorSignal.set('El token no contiene un rol válido');
          this.loadingSignal.set(false);
          return;
        }
        if (!userId) {
          this.errorSignal.set('El token no contiene el id del usuario');
          this.loadingSignal.set(false);
          return;
        }

        if (!ALLOWED_ROLES.includes(role)) {
          this.errorSignal.set(
            `Acceso denegado. Solo enfermeros y administradores pueden iniciar sesión.`
          );
          this.loadingSignal.set(false);
          // Nos aseguramos de no dejar sesión colgada
          this.logout();
          return;
        }
        // 3️ Guardar todo en localStorage

        localStorage.setItem(TOKEN_KEY, resource.token);
        localStorage.setItem(ROLE_KEY, role);
        if (email) localStorage.setItem(EMAIL_KEY, email);
        if (userId) localStorage.setItem(USER_ID_KEY, userId);

        this.roleSignal.set(role);
        this.emailSignal.set(email);
        this.userIdSignal.set(userId);
        this.isSignedInSignal.set(true);
        this.loadingSignal.set(false);

        // 4️ Cargar el usuario en el IamStore (asíncrono, no bloquea)
        this.iamStore.loadCurrentUser(userId);

        this.loadingSignal.set(false);
        // 4️ Redirigir según el rol
        this.redirectByRole(role);
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.isSignedInSignal.set(false);
        this.roleSignal.set(null);
        this.errorSignal.set('Credenciales incorrectas');
        this.loadingSignal.set(false);
      }
    });
  }

  // ============================================
  // SIGN UP
  // ============================================
  signUp(command: SignUpCommand): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.signUp(command).subscribe({
      next: (resource) => {
        this.loadingSignal.set(false);
        void this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Sign-up failed:', err);
        this.errorSignal.set('Error al crear la cuenta');
        this.loadingSignal.set(false);
      }
    });
  }

  // ============================================
  // LOGOUT
  // ============================================
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(USER_ID_KEY);
    this.isSignedInSignal.set(false);
    this.currentUsernameSignal.set(null);
    this.currentUserIdSignal.set(null);
    this.roleSignal.set(null);
    this.emailSignal.set(null);
    this.userIdSignal.set(null);
    this.iamStore.clear();
  }

  /**
   * Redirige al usuario según su rol.
   */
  private redirectByRole(role: string): void {
    switch (role) {
      case 'Admin':
        void this.router.navigate(['/admin/home']);
        break;
      case 'Nurse':
        void this.router.navigate(['/nurse/home']);
        break;
      default:
        console.warn('Rol desconocido:', role);
        this.logout();
    }
  }

  clearError() {
    this.errorSignal.set(null);

  }
}
