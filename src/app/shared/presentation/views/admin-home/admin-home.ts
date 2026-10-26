import { Component } from '@angular/core';
import {AdminWelcomeHeader} from '../../components/admin-welcome-header/admin-welcome-header';
import {AdminSummaryCards} from '../../components/admin-summary-cards/admin-summary-cards';
import {
  FacilityStatusList
} from '../../../../analytics-reporting/presentation/components/facility-status-list/facility-status-list';

@Component({
  imports: [
    AdminWelcomeHeader,
    AdminSummaryCards,
    FacilityStatusList
  ],
  selector: 'app-admin-home',
  styleUrl: './admin-home.css',
  templateUrl: './admin-home.html',
})
export class AdminHome {}
