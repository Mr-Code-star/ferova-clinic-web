import { Component, inject } from '@angular/core';
import { PatientsStore } from '../../../application/patients-store';

@Component({
  imports: [],
  selector: 'app-patient-count-card',
  styleUrl: './patient-count-card.css',
  templateUrl: './patient-count-card.html',
})
export class PatientCountCard {
  private readonly store = inject(PatientsStore);

  // Exponemos el signal del conteo
  readonly count = this.store.activeCount;

  ngOnInit(): void {
    // Cargamos el conteo al inicializar el componente
    this.store.loadActivePatientsCount();
  }
}
