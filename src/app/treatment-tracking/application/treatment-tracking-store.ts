import { inject, Injectable, signal } from '@angular/core';
import { TreatmentTrackingApi } from '../infrastructure/treatment-tracking-api';
import { RiskOverview } from '../domain/model/risk-overview.entity';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { TreatmentDetail } from '../domain/model/treatment-detail.entity';
import { WeeklyAdherence } from '../domain/model/weekly-adherence.entity';
import { NextDose } from '../domain/model/next-dose.entity';
import {PendingPatient} from '../domain/model/pending-patient.entity';
import {PendingPatientsResponse} from '../infrastructure/pending-patients-response';

@Injectable({ providedIn: 'root' })
export class TreatmentTrackingStore {
  private readonly api = inject(TreatmentTrackingApi);

  private readonly riskOverviewSignal = signal<RiskOverview | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly riskPatientsSignal = signal<RiskPatient[]>([]);
  private readonly treatmentDetailSignal = signal<TreatmentDetail | null>(null);
  private readonly weeklyAdherenceSignal = signal<WeeklyAdherence | null>(null);
  private readonly nextDoseSignal = signal<NextDose | null>(null);
  private readonly pendingPatientsSignal = signal<PendingPatient[]>([]);
  private readonly pendingStateSignal = signal<PendingPatientsResponse | null>(null);

  readonly riskOverview = this.riskOverviewSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly riskPatients = this.riskPatientsSignal.asReadonly();
  readonly treatmentDetail = this.treatmentDetailSignal.asReadonly();
  readonly weeklyAdherence = this.weeklyAdherenceSignal.asReadonly();
  readonly nextDose = this.nextDoseSignal.asReadonly();
  readonly pendingPatients = this.pendingPatientsSignal.asReadonly();
  readonly pendingState = this.pendingStateSignal.asReadonly();

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

  loadPatientsByRiskLevel(riskLevel: string): void {
    this.loadingSignal.set(true);
    this.api.getPatientsByRiskLevel(riskLevel).subscribe({
      next: (patients) => {
        this.riskPatientsSignal.set(patients);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading risk patients:', err);
        this.riskPatientsSignal.set([]);
        this.loadingSignal.set(false);
      }
    });
  }

  loadTreatmentDetail(patientId: string): void {
    this.loadingSignal.set(true);
    this.api.getTreatmentDetail(patientId).subscribe({
      next: (detail) => {
        this.treatmentDetailSignal.set(detail);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading treatment detail:', err);
        this.treatmentDetailSignal.set(null);
        this.loadingSignal.set(false);
      }
    });
  }

  loadWeeklyAdherence(patientId: string): void {
    this.api.getWeeklyAdherence(patientId).subscribe({
      next: (data) => this.weeklyAdherenceSignal.set(data),
      error: (err) => {
        console.error('Error loading weekly adherence:', err);
        this.weeklyAdherenceSignal.set(null);
      },
    });
  }

  loadNextDose(patientId: string): void {
    this.api.getNextDose(patientId).subscribe({
      next: (data) => this.nextDoseSignal.set(data),
      error: (err) => {
        console.error('Error loading next dose:', err);
        this.nextDoseSignal.set(null);
      },
    });
  }

  loadPendingPatients(): void {
    this.loadingSignal.set(true);
    this.api.getPendingPatients().subscribe({
      next: (response) => {
        this.pendingStateSignal.set(response);
        this.pendingPatientsSignal.set(
          response.pendingPatients.map(p => new PendingPatient(p))
        );
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading pending patients:', err);
        this.pendingPatientsSignal.set([]);
        this.loadingSignal.set(false);
      }
    });
  }
}
