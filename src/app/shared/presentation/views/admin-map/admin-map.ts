import { Component, signal, computed, inject } from '@angular/core';
import { HeatMap } from '../../../../analytics-reporting/presentation/components/heat-map/heat-map';
import { AnalyticsStore } from '../../../../analytics-reporting/application/analytics.store';

type RiskFilter = 'all' | 'HIGH' | 'MEDIUM' | 'LOW';

@Component({
  selector: 'app-admin-map',
  standalone: true,
  imports: [HeatMap],
  styleUrl: './admin-map.css',
  templateUrl: './admin-map.html',
})
export class AdminMap {
  private readonly analyticsStore = inject(AnalyticsStore);

  // ============================================
  // ESTADO
  // ============================================
  readonly loading = this.analyticsStore.loading;
  readonly error = this.analyticsStore.error;

  activeFilter = signal<RiskFilter>('all');

  /**
   * Puntos filtrados por el rol seleccionado.
   * Filtra en cliente sobre los puntos del store.
   */
  filteredPoints = computed(() => {
    const filter = this.activeFilter();
    const allPoints = this.analyticsStore.points();

    if (filter === 'all') return allPoints;
    return allPoints.filter((p) => p.riskLevel === filter);
  });

  // ============================================
  // ACCIONES
  // ============================================
  setFilter(filter: RiskFilter): void {
    this.activeFilter.set(filter);
  }
}
