import { environment } from '../../../envirotments/environment.development';
import { Injectable } from '@angular/core';
import { RiskOverviewAssembler } from './risk-overview-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskOverviewResponse } from './risk-overview-response';

const treatmentTrackingUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class RiskOverviewApiEndpoint {
  private readonly assembler = new RiskOverviewAssembler();

  constructor(private http: HttpClient) {}

  getRiskOverview(): Observable<RiskOverview> {
    return this.http.get<RiskOverviewResponse>(`${treatmentTrackingUrl}/risk-overview`).pipe(
      map(response => this.assembler.toEntityFromResponse(response))
    );
  }
}
