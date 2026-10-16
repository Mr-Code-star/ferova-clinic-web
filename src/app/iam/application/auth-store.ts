import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IamApi } from '../infrastructure/iam-api';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignUpCommand } from '../domain/model/sign-up.command';

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private readonly iamApi = inject(IamApi);
  private readonly router = inject(Router);

  // Estado
  private readonly isSignedInSignal = signal<boolean>(false);
  private readonly currentUsernameSignal = signal<string | null>(null);
  private readonly currentUserIdSignal = signal<number | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // API pública (readonly)
  readonly isSignedIn = this.isSignedInSignal.asReadonly();
  readonly currentUsername = this.currentUsernameSignal.asReadonly();
  readonly currentUserId = this.currentUserIdSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly currentToken = computed(() =>
    this.isSignedIn() ? localStorage.getItem('token') : null
  );

  // ============================================
  // SIGN IN
  // ============================================
  signIn(command: SignInCommand): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.signIn(command).subscribe({
      next: (resource) => {
        localStorage.setItem('token', resource.token);
        this.isSignedInSignal.set(true);
        this.loadingSignal.set(false);
        void this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.isSignedInSignal.set(false);
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
        console.log('Sign-up successful:', resource);
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
    localStorage.removeItem('token');
    this.isSignedInSignal.set(false);
    this.currentUsernameSignal.set(null);
    this.currentUserIdSignal.set(null);
    void this.router.navigate(['/auth/login']);
  }

  clearError() {
    this.errorSignal.set(null);

  }
}
