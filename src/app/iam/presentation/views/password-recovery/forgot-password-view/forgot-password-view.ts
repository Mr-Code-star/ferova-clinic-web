import { Component, inject } from '@angular/core';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { ForgotPasswordForm } from '../../../components/forgot-password-form/forgot-password-form';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { PasswordRecoveryStore } from '../../../../application/password-recovery-store';

@Component({
  imports: [RecoveryShell, ForgotPasswordForm, MatIcon, RouterLink],
  selector: 'app-forgot-password-view',
  styleUrl: './forgot-password-view.css',
  templateUrl: './forgot-password-view.html',
})
export class ForgotPasswordView {
  private readonly recoveryStore = inject(PasswordRecoveryStore);

  readonly loading = this.recoveryStore.loading;
  readonly error = this.recoveryStore.error;

  onEmailSubmit(email: string): void {
    this.recoveryStore.requestCode(email);
  }
}
