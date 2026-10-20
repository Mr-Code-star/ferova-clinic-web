import { inject, Injectable, signal } from '@angular/core';
import { PatientsApi } from '../infrastructure/patient-api';
import { SearchResource } from '../infrastructure/search-term-response';

@Injectable({providedIn: 'root'})
export class PatientsStore {
  private readonly api = inject(PatientsApi);

  private readonly searchResultsSignal = signal<SearchResource[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly hasSearchedSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly searchResults = this.searchResultsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly hasSearched = this.hasSearchedSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

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

  clear(): void {
    this.searchResultsSignal.set([]);
    this.hasSearchedSignal.set(false);
  }
}
