import { environment } from '../../../environment/environment';
import { Injectable } from '@angular/core';
import { RiskOverviewAssembler } from './risk-overview-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskOverviewResponse } from './risk-overview-response';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { RiskPatientsAssembler } from './risk-patients-assembler';
import { RiskPatientsResponse } from './risk-patients-response';


const RiskOverviewUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class RiskOverviewApiEndpoint {
  private readonly assembler = new RiskOverviewAssembler();
  private readonly patientsAssembler = new RiskPatientsAssembler();

  constructor(private http: HttpClient) {}

  getRiskOverview(): Observable<RiskOverview> {
    return this.http
      .get<RiskOverviewResponse>(`${RiskOverviewUrl}/risk-overview`)
      .pipe(map((response) => this.assembler.toEntityFromResponse(response)));
  }
  getPatientsByRiskLevel(riskLevel: string): Observable<RiskPatient[]> {
    return this.http
      .get<RiskPatientsResponse>(`${RiskOverviewUrl}/risk/${riskLevel}/patients`)
      .pipe(map((response) => this.patientsAssembler.toEntitiesFromResponse(response)));
  }

}
