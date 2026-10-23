import { inject, Injectable } from '@angular/core';
import { RiskOverviewApiEndpoint } from './risk-overview-api-endpoint';
import { Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';

@Injectable({ providedIn: 'root' })
export class TreatmentTrackingApi {
  private readonly riskEndpoint = inject(RiskOverviewApiEndpoint);

  getRiskOverview(): Observable<RiskOverview> {
    return this.riskEndpoint.getRiskOverview();
  }
}
