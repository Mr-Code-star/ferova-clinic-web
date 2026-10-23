import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Patient } from '../domain/model/patient.entity';
import { PatientResource, PatientResponse } from './patients-response';
import { PatientsAssembler } from './patients-assembler';
import { environment } from '../../../envirotments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AssignPatientCommand } from '../domain/model/assign-patient.command';
import { SearchMyPatientsAssembler } from './search-my-patients-assembler';
import { PatientHistoryResponse } from './search-my-patients-response';
import { ActivePatientsCountResource } from './active-patients-count-response';


const patientUrl = `${environment.serverBasePath}${environment.patientEndpointPath}`;

@Injectable({providedIn: 'root'})
export class PatientsApiEndpoint extends BaseApiEndpoint<Patient, PatientResource, PatientResponse, PatientsAssembler>{

  private readonly searchMyPatientsAssembler = new SearchMyPatientsAssembler();

  constructor(http: HttpClient) {
    super(http, patientUrl, new PatientsAssembler());
  }

  /**
   * Sobrescribimos getAllById para que apunte a la ruta correcta:
   * GET /patients/mother/{motherId}
   */
  override getAllById(motherId: string): Observable<Patient[]> {
    return this.http.get<PatientResponse>(`${patientUrl}/mother/${motherId}`).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch patients by mother'))
    );
  }

  assignPatient(command: AssignPatientCommand): Observable<any> {
    const request = this.assembler.toRequestFromCommand(command);

    return this.http.post<any>(`${patientUrl}/assign-nurse`, request).pipe(
      catchError(this.handleError('Failed to assign patient'))
    );
  }

  SearchMyPatient(searchTerm?: string): Observable<Patient[]> {
    const url = searchTerm
      ? `${patientUrl}/nurse?searchTerm=${encodeURIComponent(searchTerm)}`
      : patientUrl;

    return this.http.get<PatientHistoryResponse>(url).pipe(
      map(response => {
        // Si el backend dice EMPTY, devolvemos un array vacío
        if (response.status === 'EMPTY') {
          return [];
        }
        return this.searchMyPatientsAssembler.toEntitiesFromResponse(response);
      }),
      catchError((err) => {
        console.error('Error fetching medical history:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * GET /patients/nurse/active-count
   */
  getActivePatientsCount(): Observable<ActivePatientsCountResource> {
    return this.http.get<ActivePatientsCountResource>(`${patientUrl}/nurse/active-count`).pipe(
      catchError(this.handleError('Failed to fetch active patients count'))
    );
  }
}
