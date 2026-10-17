import { computed, Injectable, signal } from '@angular/core';
import { HeatMap } from '../domain/model/heat-map.entity';
import { AnalyticsApi } from '../infrastructure/analytics-api';

@Injectable({providedIn: 'root'})
export class AnalyticsStore {
  // State signals
  private readonly pointSignal = signal<HeatMap[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  // Readonly signals
  readonly points = this.pointSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed Signals
  readonly pointsCount = computed(() => this.points().length);
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Constructor
   */
  constructor(private analyticApi: AnalyticsApi) {
   this.loadPoints();
  }

  private loadPoints(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticApi.getPoints().pipe().subscribe({
      next: points => {
        this.pointSignal.set(points);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load points in the Map'))
        this.loadingSignal.set(false);
      }
    })
  }

  /**
   * Formats error messages.
   * @private
   * @param error - The error object.
   * @param fallback - The fallback error message.
   * @returns The formatted error message.
   */
  private formatError(error: any,  fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    return fallback;
  }
}
