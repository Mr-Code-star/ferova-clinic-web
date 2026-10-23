import { inject, Injectable, signal } from '@angular/core';
import { HealthFacilityApi } from '../infrastructure/health-facility-api';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { Appointment } from '../domain/model/appointment.entity';

@Injectable({ providedIn: 'root' })
export class HealthFacilityStore {
  private readonly api = inject(HealthFacilityApi);

  private readonly facilitySignal = signal<HealthFacility | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly appointmentsSignal = signal<Appointment[]>([]);
  private readonly allAppointmentsSignal = signal<Appointment[]>([]);
  private readonly allAppointmentsLoadingSignal = signal<boolean>(false);
  private readonly allAppointmentsErrorSignal = signal<string | null>(null);

  readonly facility = this.facilitySignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly appointments = this.appointmentsSignal.asReadonly();
  readonly allAppointments = this.allAppointmentsSignal.asReadonly();
  readonly allAppointmentsLoading = this.allAppointmentsLoadingSignal.asReadonly();
  readonly allAppointmentsError = this.allAppointmentsErrorSignal.asReadonly();

  constructor() {
    this.loadMyFacility();
  }

  loadMyFacility(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getMyFacility().subscribe({
      next: (facility) => {
        this.facilitySignal.set(facility);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading facility:', err);
        this.errorSignal.set('No se pudo cargar la posta médica.');
        this.loadingSignal.set(false);
      },
    });
  }

  loadTopAppointments(limit: number = 4): void {
    this.api.getTopAppointments(limit).subscribe({
      next: (appointments) => {
        this.appointmentsSignal.set(appointments);
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.appointmentsSignal.set([]);
      },
    });
  }

  loadAllNurseAppointments(): void {
    this.allAppointmentsLoadingSignal.set(true);
    this.allAppointmentsErrorSignal.set(null);

    this.api.getAllNurseAppointments().subscribe({
      next: (appointments) => {
        this.allAppointmentsSignal.set(appointments);
        this.allAppointmentsLoadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading all appointments:', err);
        this.allAppointmentsErrorSignal.set('No se pudieron cargar las citas.');
        this.allAppointmentsLoadingSignal.set(false);
      },
    });
  }
}
