import { inject, Injectable } from '@angular/core';
import { RiskOverviewApiEndpoint } from './risk-overview-api-endpoint';
import { Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { TreatmentDetail } from '../domain/model/treatment-detail.entity';
import { WeeklyAdherence } from '../domain/model/weekly-adherence.entity';
import { NextDose } from '../domain/model/next-dose.entity';

@Injectable({ providedIn: 'root' })
export class TreatmentTrackingApi {
  private readonly riskEndpoint = inject(RiskOverviewApiEndpoint);

  getRiskOverview(): Observable<RiskOverview> {
    return this.riskEndpoint.getRiskOverview();
  }

  getPatientsByRiskLevel(riskLevel: string): Observable<RiskPatient[]> {
    return this.riskEndpoint.getPatientsByRiskLevel(riskLevel);
  }

  getTreatmentDetail(patientId: string): Observable<TreatmentDetail>{
    return this.riskEndpoint.getTreatmentDetail(patientId);
  }

  getWeeklyAdherence(patientId: string): Observable<WeeklyAdherence> {
    return this.riskEndpoint.getWeeklyAdherence(patientId);
  }

  getNextDose(patientId: string): Observable<NextDose> {
    return this.riskEndpoint.getNextDose(patientId);
  }
}
