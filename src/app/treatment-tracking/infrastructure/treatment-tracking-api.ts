import { inject, Injectable } from '@angular/core';
import { RiskOverviewApiEndpoint } from './risk-overview-api-endpoint';
import { Observable } from 'rxjs';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { TreatmentDetail } from '../domain/model/treatment-detail.entity';
import { WeeklyAdherence } from '../domain/model/weekly-adherence.entity';
import { NextDose } from '../domain/model/next-dose.entity';
import {PendingPatientsApiEndpoint} from './pending-patients-api-endpoint';
import {PendingPatientsResponse} from './pending-patients-response';
import {TreatmentApiEndpoint} from './treatment-api-endpoint';
import {CreateTreatmentCommand} from '../domain/model/create-treatment.command';
import {CreateTreatmentApiEndpoint} from './create-treatment-api-endpoint';
import {NurseTreatment} from '../domain/model/nurse-treatment.entity';

@Injectable({ providedIn: 'root' })
export class TreatmentTrackingApi {
  private readonly riskEndpoint = inject(RiskOverviewApiEndpoint);
  private readonly pendingEndpoint = inject(PendingPatientsApiEndpoint);
  private readonly treatmentEndpoint = inject(TreatmentApiEndpoint);
  private readonly createTreatmentEndpoint = inject(CreateTreatmentApiEndpoint)

  getRiskOverview(): Observable<RiskOverview> {
    return this.riskEndpoint.getRiskOverview();
  }

  getPatientsByRiskLevel(riskLevel: string): Observable<RiskPatient[]> {
    return this.riskEndpoint.getPatientsByRiskLevel(riskLevel);
  }

  getTreatmentDetail(patientId: string): Observable<TreatmentDetail>{
    return this.treatmentEndpoint.getTreatmentDetail(patientId);
  }

  getWeeklyAdherence(patientId: string): Observable<WeeklyAdherence> {
    return this.treatmentEndpoint.getWeeklyAdherence(patientId);
  }

  getNextDose(patientId: string): Observable<NextDose> {
    return this.treatmentEndpoint.getNextDose(patientId);
  }

  getPendingPatients(): Observable<PendingPatientsResponse> {
    return this.pendingEndpoint.getPendingPatients();
  }

  createTreatment(command: CreateTreatmentCommand): Observable<any> {
    return this.createTreatmentEndpoint.createTreatment(command);
  }

  getNurseTreatments(status?: string): Observable<NurseTreatment[]> {
    return this.treatmentEndpoint.getNurseTreatments(status);
  }
}
