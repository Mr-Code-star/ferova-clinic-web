import { inject, Injectable, signal } from '@angular/core';
import { IamApi } from '../infrastructure/iam-api';
import { Router } from '@angular/router';
import { RequestCodeCommand } from '../domain/model/request-code.command';
import { HttpErrorResponse } from '@angular/common/http';
import { VerifyCodeCommand } from '../domain/model/verify-code.command';
import { ResetPasswordCommand } from '../domain/model/reset-password.command';

@Injectable({ providedIn: 'root' })
export class PasswordRecoveryStore {
  private readonly iamApi = inject(IamApi);
  private readonly router = inject(Router);

  // ============================================
  // ESTADO DEL FLUJO
  // ============================================

  /** Email del usuario (persiste entre pasos 1 → 3). */
  private readonly emailSignal = signal<string>('');

  /** Código de 4 dígitos (persiste entre pasos 2 → 3). */
  private readonly codeSignal = signal<string>('');

  /** Indica si hay una petición HTTP en curso. */
  private readonly loadingSignal = signal<boolean>(false);

  /** Mensaje de error del backend (viene en `err.error.error`). */
  private readonly errorSignal = signal<string | null>(null);

  /** Mensaje de éxito del backend (viene en `response.message`). */
  private readonly successSignal = signal<string | null>(null);

  // ============================================
  // API PÚBLICA (readonly)
  // ============================================

  readonly email = this.emailSignal.asReadonly();
  readonly code = this.codeSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly success = this.successSignal.asReadonly();

  // ============================================
  // PASO 1: Solicitar código
  // ============================================

  /**
   * Sends a password recovery code to the given email.
   * On success, saves the email and navigates to the verify-code view.
   *
   * @param email - The user's email address
   */
  requestCode(email: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.successSignal.set(null);

    const command = new RequestCodeCommand(email);

    this.iamApi.requestPasswordCode(command).subscribe({
      next: (response) => {

        // Guardamos el email para los siguientes pasos
        this.emailSignal.set(email);

        // Guardamos el mensaje de éxito del backend (si lo mandó)
        this.successSignal.set(response?.message ?? null);

        this.loadingSignal.set(false);

        // Navegamos al paso 2
        void this.router.navigate(['/auth/verify-code']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Request code failed:', err);
        this.loadingSignal.set(false);
      },
    });
  }
  // ============================================
  // PASO 2: Verificar código
  // ============================================

  /**
   * Verifies the 4-digit code sent to the user's email.
   * On success, saves the code and navigates to the reset-password view.
   *
   * @param code - The 4-digit verification code
   */
  verifyCode(code: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.successSignal.set(null);

    const command = new VerifyCodeCommand(this.emailSignal(), code);

    this.iamApi.verifyPasswordCode(command).subscribe({
      next: (response) => {

        // Guardamos el código para el paso 3
        this.codeSignal.set(code);

        // Guardamos el mensaje de éxito del backend (si lo mandó)
        this.successSignal.set(response?.message ?? null);

        this.loadingSignal.set(false);

        // Navegamos al paso 3
        void this.router.navigate(['/auth/reset-password']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Verify code failed:', err);
        this.loadingSignal.set(false);
      },
    });
  }

  // ============================================
  // PASO 3: Resetear contraseña
  // ============================================

  /**
   * Sets a new password using the previously verified email and code.
   * On success, clears the flow and navigates back to login.
   *
   * @param newPassword - The user's new password
   */
  resetPassword(newPassword: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.successSignal.set(null);

    const command = new ResetPasswordCommand(
      this.emailSignal(),
      this.codeSignal(),
      newPassword
    );

    this.iamApi.resetPassword(command).subscribe({
      next: (response) => {

        this.successSignal.set(
          response?.message ?? 'Contraseña actualizada correctamente'
        );

        this.loadingSignal.set(false);

        // Limpiamos el flujo (email y code)
        this.clearFlow();

        // Navegamos al login
        void this.router.navigate(['/auth/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Reset password failed:', err);
        this.loadingSignal.set(false);
      },
    });
  }

  /**
   * Clears the email and code (called after a successful reset).
   */
  private clearFlow(): void {
    this.emailSignal.set('');
    this.codeSignal.set('');
  }

}
