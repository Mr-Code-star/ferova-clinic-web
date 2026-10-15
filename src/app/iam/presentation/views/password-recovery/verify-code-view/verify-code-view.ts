import { Component, inject  } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { VerifyCodeForm } from '../../../components/verify-code-form/verify-code-form';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [MatIcon, RecoveryShell, VerifyCodeForm],
  selector: 'app-verify-code-view',
  styleUrl: './verify-code-view.css',
  templateUrl: './verify-code-view.html',
})
export class VerifyCodeView {
  private readonly router = inject(Router);

  onCodeSubmit(code: string): void {
    console.log('Código recibido:', code);

    // TODO: Conectar con IamStore:
    // this.iam.verifyRecoveryCode(code).subscribe({
    //   next: () => this.router.navigate(['/auth/reset-password']),
    //   error: (err) => console.error(err),
    // });
  }

  onBack(): void {
    void this.router.navigate(['/auth/forgot-password']);
  }
}
