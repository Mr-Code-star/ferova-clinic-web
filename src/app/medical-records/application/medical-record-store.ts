import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalRecordApi } from '../infrastructure/medical-record-api';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreateControlCommand } from '../domain/model/create-control.command';
import { ControlHistoryResponse } from '../infrastructure/control-history-reponse';

@Injectable({ providedIn: 'root' })
export class MedicalRecordStore {
  private readonly api = inject(MedicalRecordApi);
  private readonly router = inject(Router);

  // Estado para el historial actual
  private readonly medicalRecordSignal = signal<MedicalRecord | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly controlHistorySignal = signal<ControlHistoryResponse | null>(null);

  readonly medicalRecord = this.medicalRecordSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly controlHistory = this.controlHistorySignal.asReadonly();

  /**
   * Carga el historial médico de un paciente.
   */
  loadMedicalRecordByPatientId(patientId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getMedicalRecord(patientId).subscribe({
      next: (record) => {
        this.medicalRecordSignal.set(record);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
        this.errorSignal.set('No se pudo cargar el historial médico.');
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Guarda un nuevo historial médico.
   */
  saveMedicalRecord(command: CreateMedicalRecordCommand): Observable<any> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.api.createMedicalRecord(command).pipe(
      tap((response) => {
        // Solo actualizamos el signal si la respuesta es un MedicalRecord válido
        if (response instanceof MedicalRecord) {
          this.medicalRecordSignal.set(response);
        }
        this.loadingSignal.set(false);
      }),
      catchError((err) => {
        console.error('Error en store:', err);
        this.errorSignal.set('No se pudo guardar el historial médico.');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  updateMedicalRecord(command: CreateMedicalRecordCommand): Observable<any> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.api.updateMedicalRecord(command).pipe(
      tap((response) => {
        if (response instanceof MedicalRecord) {
          this.medicalRecordSignal.set(response);
        }
        this.loadingSignal.set(false);
      }),
      catchError((err) => {
        console.error('Error actualizando historial:', err);
        this.errorSignal.set('No se pudo actualizar el historial médico.');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  saveHemoglobinControl(command: CreateControlCommand): Observable<any> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.api.createHemoglobinControl(command).pipe(
      tap(() => {
        this.loadingSignal.set(false);
      }),
      catchError((err) => {
        console.error('Error guardando control:', err);
        this.errorSignal.set('No se pudo guardar el control de hemoglobina.');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  loadControlHistory(medicalRecordId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getControlsByMedicalRecordId(medicalRecordId).subscribe({
      next: (history) => {
        this.controlHistorySignal.set(history);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error cargando controles:', err);
        this.errorSignal.set('No se pudieron cargar los controles.');
        this.loadingSignal.set(false);
      }
    });
  }
  clear(): void {
    this.medicalRecordSignal.set(null);
    this.errorSignal.set(null);
  }
}
