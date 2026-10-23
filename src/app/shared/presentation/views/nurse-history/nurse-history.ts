import { Component, inject } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import {
  PatientSearchBar
} from '../../../../medical-records/presentation/components/patient-search-bar/patient-search-bar';
import {
  PatientHistoryList
} from '../../../../medical-records/presentation/components/patient-history-list/patient-history-list';
import {
  RegisterPatientBanner
} from '../../../../medical-records/presentation/components/register-patient-banner/register-patient-banner';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { Patient } from '../../../../patients/domain/model/patient.entity';
import { Router } from '@angular/router';

@Component({
  imports: [MatIcon, PatientSearchBar, PatientHistoryList, RegisterPatientBanner],
  selector: 'app-nurse-history',
  styleUrl: './nurse-history.css',
  templateUrl: './nurse-history.html',
})
export class NurseHistory {
  private readonly store = inject(PatientsStore);

  // Exponemos los signals del Store
  readonly patients = this.store.patients;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly totalPatients = this.store.patients; // Como no hay un computed específico, usamos patients

  private searchTimeout: any;
  private readonly router = inject(Router);

  ngOnInit(): void {
    // ⭐ Cargamos los pacientes asignados al entrar a la vista
    this.store.loadAssignedPatients();
  }

  onSearch(term: string) {
    // Debounce para no saturar el backend
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.store.loadAssignedPatients(term);
    }, 300);
  }

  onSelectPatient(patient: Patient) {
    this.store.setSelectedPatient(patient);
    this.router.navigate(['/nurse/history/register', patient.id]);
  }

  onViewHistory(patient: Patient) {
    // Esto se ejecuta desde el botón "Ver Historial"
    this.store.setSelectedPatient(patient);
    // Aquí a futuro podrías ir a una vista de lectura: /nurse/history/view/:id
    this.router.navigate(['/nurse/history/view/', patient.id]);
  }

  onUpdatePatient(patient: Patient) {
    this.store.setSelectedPatient(patient);
    // Si es "Actualizar", por ahora lo llevamos al mismo formulario.
    // A futuro podrías tener una ruta como '/nurse/history/update/:id'
    this.router.navigate(['/nurse/history/update/', patient.id]);
  }

  ngOnDestroy(): void {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
  }
}
