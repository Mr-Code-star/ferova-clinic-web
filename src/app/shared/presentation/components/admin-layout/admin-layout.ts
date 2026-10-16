import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../../../iam/application/auth-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { IamStore } from '../../../../iam/application/iam-store';

@Component({
  imports: [RouterLink, MatIcon, RouterLinkActive, RouterOutlet, MatIconButton],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly iamStore = inject(IamStore);

  protected readonly navOptions = [
    { label: 'Inicio', icon: 'home', link: '/admin/home' },
    { label: 'Mapa', icon: 'map', link: '/admin/map' },
    { label: 'Postas', icon: 'local_hospital', link: '/admin/posts' },
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
