import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {AdminDashboardStore} from '../../../../analytics-reporting/application/admin-dashboard.store';

@Component({
  imports: [
    MatIcon
  ],
  selector: 'app-admin-summary-cards',
  styleUrl: './admin-summary-cards.css',
  templateUrl: './admin-summary-cards.html',
})
export class AdminSummaryCards {
  private readonly store = inject(AdminDashboardStore);
  readonly summary = this.store.summary;
}
