import { inject, Injectable, signal } from '@angular/core';
import { PatientsApi } from '../infrastructure/patient-api';
import { SearchResource } from '../infrastructure/search-term-response';
import { Patient } from '../domain/model/patient.entity';
import { AssignPatientCommand } from '../domain/model/assign-patient.command';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PatientsStore {
  private readonly api = inject(PatientsApi);

  private readonly patientsSignal = signal<Patient[]>([]);
  private readonly searchResultsSignal = signal<SearchResource[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly hasSearchedSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly activeMotherSignal = signal<SearchResource | null>(null);
  private readonly selectedPatientSignal = signal<Patient | null>(null);
  private readonly activeCountSignal = signal<number>(0);

  readonly searchResults = this.searchResultsSignal.asReadonly();
  readonly patients = this.patientsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly hasSearched = this.hasSearchedSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly activeMother = this.activeMotherSignal.asReadonly();
  readonly selectedPatient = this.selectedPatientSignal.asReadonly();
  readonly activeCount = this.activeCountSignal.asReadonly();

  searchMotherByDni(dni: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.hasSearchedSignal.set(true);

    this.api.searchMotherByDni(dni).subscribe({
      next: (results) => {
        this.searchResultsSignal.set(results);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error searching patient:', err);
        this.searchResultsSignal.set([]);
        this.errorSignal.set('Error al buscar. Intenta de nuevo.');
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Carga los pacientes de una madre desde el backend.
   * Endpoint: GET /api/patients/mother/{motherId}
   * Response: { data: PatientResource[] }
   */
  loadPatientsByMother(motherId: string): void {
    if (!motherId) {
      this.errorSignal.set('Mother ID es requerido');
      return;
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.GetPatientByMotherId(motherId).subscribe({
      next: (patients) => {
        this.patientsSignal.set(patients);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading patients by mother:', err);
        this.patientsSignal.set([]);
        this.errorSignal.set('Error al cargar los pacientes. Intenta de nuevo.');
        this.loadingSignal.set(false);
      },
    });
  }

  assignPatient(patientId: string): Observable<any> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    const command = new AssignPatientCommand(patientId);

    return this.api.assignPatientToNurse(command).pipe(
      tap((response) => {
        console.log('✅ Paciente asignado:', response);
        // Actualizamos la lista local
        this.patientsSignal.update((patients) =>
          patients.map((p) => {
            if (p.patientId === patientId) {
              p.assigmentStatus = 'ASSIGNED';
            }
            return p;
          })
        );
        this.loadingSignal.set(false);
      }),
      catchError((err) => {
        console.error('❌ Error asignando:', err);
        this.loadingSignal.set(false);
        // Pasamos el error tal cual a la vista
        return throwError(() => err);
      })
    );
  }

  loadAssignedPatients(searchTerm: string = ''): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getAssignedPatients(searchTerm).subscribe({
      next: (patients) => {
        this.patientsSignal.set(patients);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading assigned patients:', err);
        this.patientsSignal.set([]);
        this.errorSignal.set('No se pudieron cargar los pacientes.');
        this.loadingSignal.set(false);
      }
    });
  }

  loadActivePatientsCount(): void {
    this.api.getActivePatientsCount().subscribe({
      next: (response) => {
        this.activeCountSignal.set(response.activePatientsCount);
      },
      error: (err) => {
        console.error('Error loading active patients count:', err);
        this.activeCountSignal.set(0);
      }
    });
  }

  setActiveMother(mother: SearchResource): void {
    this.activeMotherSignal.set(mother);
  }

  setSelectedPatient(patient: Patient): void {
    this.selectedPatientSignal.set(patient);
  }

  checkMedicalRecord(patientId: string): Observable<boolean> {
    return this.api.checkMedicalRecord(patientId);
  }

  clearActiveMother(): void {
    this.activeMotherSignal.set(null);
  }

  clear(): void {
    this.searchResultsSignal.set([]);
    this.hasSearchedSignal.set(false);
  }
}
