import { Component, inject } from '@angular/core';
import { RecoveryShell } from '../../../../../shared/presentation/components/recovery-shell/recovery-shell';
import { ForgotPasswordForm } from '../../../components/forgot-password-form/forgot-password-form';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RecoveryShell, ForgotPasswordForm, MatIcon, RouterLink],
  selector: 'app-forgot-password-view',
  styleUrl: './forgot-password-view.css',
  templateUrl: './forgot-password-view.html',
})
export class ForgotPasswordView {
  private readonly router = inject(Router);

  onEmailSubmit(email: string): void {

    console.log('Email recibido:', email);

    // TODO: Aquí conectarás con el servicio de IAM:
    // this.iamService.requestPasswordReset(email).subscribe({
    //   next: () => this.router.navigate(['/auth/verify-code']),
    //   error: (err) => console.error(err)
    // });
    void this.router.navigate(['/auth/verify-code']);

  }
}
