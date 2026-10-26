import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsStore} from '../../../application/analytics.store';
import {AdminDashboardStore} from '../../../application/admin-dashboard.store';

@Component({
  imports: [],
  selector: 'app-facility-status-list',
  styleUrl: './facility-status-list.css',
  templateUrl: './facility-status-list.html',
})
export class FacilityStatusList {
  private readonly store = inject(AdminDashboardStore);
  private readonly router = inject(Router);

  readonly facilities = this.store.facilities;

  onViewMore() {
    this.router.navigate(['/admin/facilities']);
  }
}

