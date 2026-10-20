import { Component, inject } from '@angular/core';
import {
  MotherSearchForm
} from '../../../../patients/presentation/components/mother-search-form/mother-search-form';
import {
  MotherResultList
} from '../../../../patients/presentation/components/mother-result-list/mother-result-list';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { SearchResource } from '../../../../patients/infrastructure/search-term-response';

@Component({
  imports: [MotherSearchForm, MotherResultList],
  selector: 'app-nurse-patients',
  styleUrl: './nurse-patients.css',
  templateUrl: './nurse-patients.html',
})
export class NursePatients {
  private readonly store = inject(PatientsStore);

  readonly loading = this.store.loading;
  readonly hasSearched = this.store.hasSearched;
  readonly error = this.store.error;
  readonly results = this.store.searchResults;
  lastSearchTerm: string = '';

  onSearch(dni: string) {
    this.lastSearchTerm = dni;
    this.store.searchMotherByDni(dni);
  }

  // ⬇️ MÉTODO PARA CUANDO HACEN CLIC EN "VER PACIENTES"
  onShowPatients(mother: SearchResource) {
    console.log('Ver pacientes de la madre:', mother);

    // AQUÍ HAREMOS LA SIGUIENTE PETICIÓN:
    // Buscar los hijos de esta madre usando mother.motherId
    // Ejemplo: this.store.loadPatientsByMother(mother.motherId);
  }
}
