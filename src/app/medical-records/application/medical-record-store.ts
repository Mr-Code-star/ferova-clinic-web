import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalRecordApi } from '../infrastructure/medical-record-api';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicalRecordStore {
  private readonly api = inject(MedicalRecordApi);
  private readonly router = inject(Router);

  // Estado para el historial actual
  private readonly medicalRecordSignal = signal<MedicalRecord | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly medicalRecord = this.medicalRecordSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

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

  clear(): void {
    this.medicalRecordSignal.set(null);
    this.errorSignal.set(null);
  }
}
