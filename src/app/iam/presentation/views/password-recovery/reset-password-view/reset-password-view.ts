import { Component, inject  } from '@angular/core';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { MatIcon } from '@angular/material/icon';
import { ResetPasswordForm } from '../../../components/reset-password-form/reset-password-form';
import { Router } from '@angular/router';

@Component({
  imports: [RecoveryShell, MatIcon, ResetPasswordForm],
  selector: 'app-reset-password-view',
  styleUrl: './reset-password-view.css',
  templateUrl: './reset-password-view.html',
})
export class ResetPasswordView {
  private readonly router = inject(Router);

  onPasswordSubmit(newPassword: string): void {
    console.log('Nueva contraseña:', newPassword);

    // TODO: Conectar con IamStore:
    // this.iam.resetPassword(newPassword).subscribe({
    //   next: () => this.router.navigate(['/auth/login']),
    //   error: (err) => console.error(err),
    // });

    // Por ahora, redirigimos al login:
    void this.router.navigate(['/auth/login']);
  }

  onBack(): void {
    void this.router.navigate(['/auth/verify-code']);
  }
}
