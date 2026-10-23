import { inject, Injectable, signal } from '@angular/core';
import { TreatmentTrackingApi } from '../infrastructure/treatment-tracking-api';
import { RiskOverview } from '../domain/model/risk-overview.entity';

@Injectable({ providedIn: 'root' })
export class TreatmentTrackingStore {
  private readonly api = inject(TreatmentTrackingApi);

  private readonly riskOverviewSignal = signal<RiskOverview | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly riskOverview = this.riskOverviewSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadRiskOverview();
  }

  loadRiskOverview(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getRiskOverview().subscribe({
      next: (overview) => {
        this.riskOverviewSignal.set(overview);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading risk overview:', err);
        this.errorSignal.set('No se pudo cargar el estado de riesgo.');
        this.loadingSignal.set(false);
      }
    });
  }
}
