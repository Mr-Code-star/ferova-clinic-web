import { Component, inject  } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { VerifyCodeForm } from '../../../components/verify-code-form/verify-code-form';
import { Router, RouterLink } from '@angular/router';
import { PasswordRecoveryStore } from '../../../../application/password-recovery-store';

@Component({
  imports: [MatIcon, RecoveryShell, VerifyCodeForm],
  selector: 'app-verify-code-view',
  styleUrl: './verify-code-view.css',
  templateUrl: './verify-code-view.html',
})
export class VerifyCodeView {
  private readonly recoveryStore = inject(PasswordRecoveryStore);
  private readonly router = inject(Router);

  readonly loading = this.recoveryStore.loading;
  readonly error = this.recoveryStore.error;
  readonly email = this.recoveryStore.email;   // <-- Para mostrar "código enviado a xxx@mail.com"

  onCodeSubmit(code: string): void {
    this.recoveryStore.verifyCode(code);
  }

  onBack(): void {
    void this.router.navigate(['/auth/forgot-password']);
  }

}
