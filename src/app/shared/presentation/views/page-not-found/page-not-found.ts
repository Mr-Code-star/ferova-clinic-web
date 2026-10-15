import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [RouterLink, MatButtonModule, MatIconModule, Header, Footer],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  templateUrl: './page-not-found.html',
})
export class PageNotFound {

  private readonly router = inject(Router);

  goBack(): void {
    // Vuelve a la página anterior si hay historial
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void this.router.navigate(['/auth/login']);
    }
  }
}
