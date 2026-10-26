import { Injectable, inject, signal } from '@angular/core';
import { AnalyticsApiEndpoint } from '../infrastructure/analytics-api-endpoint';
import { AdminDashboardSummary } from '../domain/model/admin-dashboard-summary.entity';
import { FacilityStatus } from '../domain/model/facility-status.entity';

@Injectable({ providedIn: 'root' })
export class AdminDashboardStore {
  private readonly api = inject(AnalyticsApiEndpoint);

  private readonly summarySignal = signal<AdminDashboardSummary | null>(null);
  private readonly facilitiesSignal = signal<FacilityStatus[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly allFacilitiesSignal = signal<FacilityStatus[]>([]);

  readonly summary = this.summarySignal.asReadonly();
  readonly facilities = this.facilitiesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly allFacilities = this.allFacilitiesSignal.asReadonly();

  constructor() {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Cargamos ambos endpoints en paralelo (o secuencial si prefieres)
    this.api.getDashboardSummary().subscribe({
      next: (summary) => this.summarySignal.set(summary),
      error: (err) => console.error('Error loading summary:', err)
    });

    this.api.getTopFacilities().subscribe({
      next: (facilities) => {
        this.facilitiesSignal.set(facilities);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading facilities:', err);
        this.facilitiesSignal.set([]);
        this.loadingSignal.set(false);
      }
    });
  }

  loadAllFacilities(): void {
    this.loadingSignal.set(true);
    this.api.getAllFacilities().subscribe({
      next: (facilities) => {
        this.allFacilitiesSignal.set(facilities);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading all facilities:', err);
        this.allFacilitiesSignal.set([]);
        this.loadingSignal.set(false);
      }
    });
  }
}
