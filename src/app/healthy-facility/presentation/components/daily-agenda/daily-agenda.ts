import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HealthFacilityStore } from '../../../application/health-facility-store';

@Component({
  imports: [MatIcon],
  selector: 'app-daily-agenda',
  styleUrl: './daily-agenda.css',
  templateUrl: './daily-agenda.html',
})
export class DailyAgenda implements OnInit {
  private readonly store = inject(HealthFacilityStore);

  readonly appointments = this.store.appointments;

  ngOnInit(): void {
    // Cargamos las 4 primeras citas
    this.store.loadTopAppointments(4);
  }
}
