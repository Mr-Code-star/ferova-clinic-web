import {Component, inject} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  imports: [MatIcon],
  selector: 'app-quick-actions-grid',
  styleUrl: './quick-actions-grid.css',
  templateUrl: './quick-actions-grid.html',
})
export class QuickActionsGrid {
  private readonly router = inject(Router);

  goToRegisterControl() {
    this.router.navigate(['/nurse/hemoglobin-control'], {
      queryParams: { from: 'quick-actions' }
    });
  }

  goToDischarge() {
    this.router.navigate(['/nurse/discharge-patients']);
  }

  goToStartTreatment() {
    this.router.navigate(['/nurse/start-treatment']);
  }
}
