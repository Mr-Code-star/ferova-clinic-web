import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TreatmentTrackingStore } from '../../../application/treatment-tracking-store';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIcon, RouterLink],
  selector: 'app-risk-summary-card',
  styleUrl: './risk-summary-card.css',
  templateUrl: './risk-summary-card.html',
})
export class RiskSummaryCard {
  private readonly store = inject(TreatmentTrackingStore);

  readonly riskOverview = this.store.riskOverview;
  readonly loading = this.store.loading;
}
