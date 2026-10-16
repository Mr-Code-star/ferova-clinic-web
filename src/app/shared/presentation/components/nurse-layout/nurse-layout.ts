import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../../../iam/application/auth-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { IamStore } from '../../../../iam/application/iam-store';

@Component({
  imports: [MatIcon, RouterLink, RouterLinkActive, MatIconButton, RouterOutlet],
  selector: 'app-nurse-layout',
  styleUrl: './nurse-layout.css',
  templateUrl: './nurse-layout.html',
})
export class NurseLayout {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly iamStore = inject(IamStore);

  protected readonly navOptions = [
    { label: 'Inicio', icon: 'home', link: '/nurse/home' },
    { label: 'Pacientes', icon: 'groups', link: '/nurse/patients' },
    { label: 'Consultas', icon: 'event', link: '/nurse/consultations' },
    { label: 'Historial', icon: 'history', link: '/nurse/history' },
  ];

  /**
   * Remplazar por el nombre y appellido del usuario logueado, que se obtiene del AuthStore.
   * @protected
   */
  protected readonly userName = this.iamStore.fullName;

  onLogout(): void {
    this.authStore.logout();
    void this.router.navigate(['/auth/login']);
  }
}
