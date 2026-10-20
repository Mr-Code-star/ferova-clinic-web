import { Component, inject } from '@angular/core';
import {
  MotherSearchForm
} from '../../../../patients/presentation/components/mother-search-form/mother-search-form';
import {
  MotherResultList
} from '../../../../patients/presentation/components/mother-result-list/mother-result-list';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { SearchResource } from '../../../../patients/infrastructure/search-term-response';
import { Router } from '@angular/router';

@Component({
  imports: [MotherSearchForm, MotherResultList],
  selector: 'app-nurse-patients',
  styleUrl: './nurse-patients.css',
  templateUrl: './nurse-patients.html',
})
export class NursePatients {
  private readonly store = inject(PatientsStore);
  private readonly router = inject(Router);

  readonly loading = this.store.loading;
  readonly hasSearched = this.store.hasSearched;
  readonly error = this.store.error;
  readonly results = this.store.searchResults;
  lastSearchTerm: string = '';

  onSearch(dni: string) {
    this.lastSearchTerm = dni;
    this.store.searchMotherByDni(dni);
  }

  onShowPatients(mother: SearchResource) {
    this.store.setActiveMother(mother);
    void this.router.navigate(['/nurse/patients/mother', mother.motherId]);
  }
}
