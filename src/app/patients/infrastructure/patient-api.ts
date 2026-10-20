import { Injectable } from '@angular/core';
import { SearchTermApiEndpoint } from './search-term-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResource } from './search-term-response';

@Injectable({ providedIn: 'root' })
export class PatientsApi {
  private readonly searchEndpoint: SearchTermApiEndpoint;

  constructor(http: HttpClient) {
    this.searchEndpoint = new SearchTermApiEndpoint(http);
  }

  searchMotherByDni(dni: string): Observable<SearchResource[]> {
    return this.searchEndpoint.searchByMotherDni(dni);
  }
}
