import { Injectable } from '@angular/core';
import { SearchTermApiEndpoint } from './search-term-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResource } from './search-term-response';
import { PatientsApiEndpoint } from './patients-api-endpoint';
import { Patient } from '../domain/model/patient.entity';
import { AssignPatientCommand } from '../domain/model/assign-patient.command';

@Injectable({ providedIn: 'root' })
export class PatientsApi {
  private readonly searchEndpoint: SearchTermApiEndpoint;
  private readonly patientEndpoint: PatientsApiEndpoint;
  constructor(http: HttpClient) {
    this.searchEndpoint = new SearchTermApiEndpoint(http);
    this.patientEndpoint = new PatientsApiEndpoint(http);
  }

  searchMotherByDni(dni: string): Observable<SearchResource[]> {
    return this.searchEndpoint.searchByMotherDni(dni);
  }

  GetPatientByMotherId(motherId: string): Observable<Patient[]> {
    return this.patientEndpoint.getAllById(motherId);
  }
  assignPatientToNurse(command: AssignPatientCommand): Observable<any> {
    return this.patientEndpoint.assignPatient(command);
  }
  getAssignedPatients(searchTerm?: string): Observable<Patient[]> {
    return this.patientEndpoint.SearchMyPatient(searchTerm);
  }
}
