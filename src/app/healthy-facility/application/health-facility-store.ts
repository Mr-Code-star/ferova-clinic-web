import { inject, Injectable, signal } from '@angular/core';
import { HealthFacilityApi } from '../infrastructure/health-facility-api';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { Appointment } from '../domain/model/appointment.entity';
import {HealthFacilityList} from '../domain/model/health-facility-list.entity';
import {UnassignedNurse} from '../domain/model/unassigned-nurse.entity';

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
  private readonly facilitiesListSignal = signal<HealthFacilityList[]>([]);
  private readonly unassignedNursesSignal = signal<UnassignedNurse[]>([]);
  private readonly canRegisterSignal = signal<boolean>(true);
  private readonly canRegisterMessageSignal = signal<string>('');
  private readonly assigningSignal = signal<boolean>(false);

  readonly facility = this.facilitySignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly appointments = this.appointmentsSignal.asReadonly();
  readonly allAppointments = this.allAppointmentsSignal.asReadonly();
  readonly allAppointmentsLoading = this.allAppointmentsLoadingSignal.asReadonly();
  readonly allAppointmentsError = this.allAppointmentsErrorSignal.asReadonly();
  readonly facilitiesList = this.facilitiesListSignal.asReadonly();
  readonly unassignedNurses = this.unassignedNursesSignal.asReadonly();
  readonly canRegister = this.canRegisterSignal.asReadonly();
  readonly canRegisterMessage = this.canRegisterMessageSignal.asReadonly();
  readonly assigning = this.assigningSignal.asReadonly();

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

  loadAllFacilities(): void {
    this.loadingSignal.set(true);
    this.api.getAllFacilities().subscribe({
      next: (facilities) => {
        this.facilitiesListSignal.set(facilities);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error loading facilities list:', err);
        this.facilitiesListSignal.set([]);
        this.loadingSignal.set(false);
      }
    });
  }

  checkCanRegister(): void {
    this.api.checkCanRegister().subscribe({
      next: (res) => {
        this.canRegisterSignal.set(res.canRegister);
        this.canRegisterMessageSignal.set(res.message);
      },
      error: (err) => {
        console.error(err);
        this.canRegisterSignal.set(false);
      }
    });
  }

  loadUnassignedNurses(): void {
    this.api.getUnassignedNurses().subscribe({
      next: (nurses) => this.unassignedNursesSignal.set(nurses),
      error: (err) => console.error(err)
    });
  }

  assignNurse(facilityId: string, nurseId: string): void {
    this.assigningSignal.set(true);
    this.api.assignNurse({ facilityId, nurseId }).subscribe({
      next: () => {
        this.assigningSignal.set(false);
        // Recargamos la lista de postas para actualizar los estados
        this.loadAllFacilities();
      },
      error: (err) => {
        console.error(err);
        this.assigningSignal.set(false);
      }
    });
  }
}
