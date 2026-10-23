import { environment } from '../../../envirotments/environment.development';
import { Injectable } from '@angular/core';
import { RiskOverviewAssembler } from './risk-overview-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskOverviewResponse } from './risk-overview-response';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { RiskPatientsAssembler } from './risk-patients-assembler';
import { RiskPatientsResponse } from './risk-patients-response';
import { TreatmentDetail } from '../domain/model/treatment-detail.entity';
import {
  NextDoseResponse,
  TreatmentDetailResource,
  TreatmentDetailResponse,
  WeeklyAdherenceResponse,
} from './treatment-detail-response';
import { TreatmentDetailAssembler } from './treatment-detail-assembler';
import { WeeklyAdherenceAssembler } from './weekly-adherence-assembler';
import { NextDoseAssembler } from './next-dose-assembler';
import { WeeklyAdherence } from '../domain/model/weekly-adherence.entity';
import { NextDose } from '../domain/model/next-dose.entity';

const treatmentTrackingUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class RiskOverviewApiEndpoint {
  private readonly assembler = new RiskOverviewAssembler();
  private readonly patientsAssembler = new RiskPatientsAssembler();
  private readonly treatmentAssembler = new TreatmentDetailAssembler();
  private readonly weeklyAssembler = new WeeklyAdherenceAssembler();
  private readonly nextDoseAssembler = new NextDoseAssembler();

  constructor(private http: HttpClient) {}

  getRiskOverview(): Observable<RiskOverview> {
    return this.http
      .get<RiskOverviewResponse>(`${treatmentTrackingUrl}/risk-overview`)
      .pipe(map((response) => this.assembler.toEntityFromResponse(response)));
  }
  getPatientsByRiskLevel(riskLevel: string): Observable<RiskPatient[]> {
    return this.http
      .get<RiskPatientsResponse>(`${treatmentTrackingUrl}/risk/${riskLevel}/patients`)
      .pipe(map((response) => this.patientsAssembler.toEntitiesFromResponse(response)));
  }

  getTreatmentDetail(patientId: string): Observable<TreatmentDetail> {
    return this.http
      .get<TreatmentDetailResource>(
        `${treatmentTrackingUrl}/patients/${patientId}/treatment-detail`,
      )
      .pipe(
        map((response) => this.treatmentAssembler.toEntityFromResource(response)),
      );
  }

  getWeeklyAdherence(patientId: string): Observable<WeeklyAdherence> {
    return this.http
      .get<WeeklyAdherenceResponse>(`${treatmentTrackingUrl}/patients/${patientId}/weekly-adherence`)
      .pipe(map(r => this.weeklyAssembler.toEntityFromResponse(r)));
  }

  getNextDose(patientId: string): Observable<NextDose> {
    return this.http
      .get<NextDoseResponse>(`${treatmentTrackingUrl}/patients/${patientId}/next-dose`)
      .pipe(map(r => this.nextDoseAssembler.toEntityFromResponse(r)));
  }
}
