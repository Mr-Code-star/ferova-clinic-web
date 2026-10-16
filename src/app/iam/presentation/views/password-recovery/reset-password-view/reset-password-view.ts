import { Component, inject  } from '@angular/core';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { MatIcon } from '@angular/material/icon';
import { ResetPasswordForm } from '../../../components/reset-password-form/reset-password-form';
import { Router } from '@angular/router';
import { PasswordRecoveryStore } from '../../../../application/password-recovery-store';

@Component({
  imports: [RecoveryShell, MatIcon, ResetPasswordForm],
  selector: 'app-reset-password-view',
  styleUrl: './reset-password-view.css',
  templateUrl: './reset-password-view.html',
})
export class ResetPasswordView {
  private readonly recoveryStore = inject(PasswordRecoveryStore);
  private readonly router = inject(Router);

  readonly loading = this.recoveryStore.loading;
  readonly error = this.recoveryStore.error;

  onPasswordSubmit(newPassword: string): void {
    this.recoveryStore.resetPassword(newPassword);
  }

  onBack(): void {
    void this.router.navigate(['/auth/verify-code']);
  }
}
