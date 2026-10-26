import { Component, computed, inject, signal } from '@angular/core';
import { HealthFacilityStore } from '../../../application/health-facility-store';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [MatIcon, RouterLink],
  selector: 'app-nurse-appointments-list',
  styleUrl: './nurse-appointments-list.css',
  templateUrl: './nurse-appointments-list.html',
})
export class NurseAppointmentsList {
  private readonly store = inject(HealthFacilityStore);
  private readonly router = inject(Router);

  readonly appointments = this.store.allAppointments;
  readonly loading = this.store.allAppointmentsLoading;
  readonly error = this.store.allAppointmentsError;
  readonly facility = this.store.facility;
  readonly searchTerm = signal<string>('');
  readonly filteredAppointments = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const all = this.appointments();

    if (!term) return all;

    return all.filter(appt =>
      appt.patientName.toLowerCase().includes(term) ||
      appt.patientId.toLowerCase().includes(term) ||
      appt.appointmentDate.includes(term)
    );
  });

  // Computados para las estadísticas superiores
  readonly totalAppointments = computed(() => this.appointments().length);

  readonly confirmedAppointments = computed(
    () => this.appointments().filter((a) => a.status === 'CONFIRMED').length,
  );

  readonly nextAppointmentTime = computed(() => {
    const appts = this.filteredAppointments(); // ⬅️ Usa filteredAppointments
    return appts.length > 0 ? appts[0].appointmentTime : '--:--';
  });

  ngOnInit(): void {
    this.store.loadAllNurseAppointments();
  }
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onBack() {
    this.router.navigate(['nurse/home']);

  }
}
