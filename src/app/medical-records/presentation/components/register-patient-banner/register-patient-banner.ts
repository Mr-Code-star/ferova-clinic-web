import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-register-patient-banner',
  styleUrl: './register-patient-banner.css',
  templateUrl: './register-patient-banner.html',
})
export class RegisterPatientBanner {
  private readonly router = inject(Router);
  goToPatients() {
    this.router.navigate(['/nurse/patients']);

  }
}
