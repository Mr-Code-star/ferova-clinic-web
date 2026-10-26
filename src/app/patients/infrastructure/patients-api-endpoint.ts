import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Patient } from '../domain/model/patient.entity';
import { PatientResource, PatientResponse } from './patients-response';
import { PatientsAssembler } from './patients-assembler';
import { environment } from '../../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AssignPatientCommand } from '../domain/model/assign-patient.command';
import { SearchMyPatientsAssembler } from './search-my-patients-assembler';
import { PatientHistoryResponse } from './search-my-patients-response';
import { ActivePatientsCountResource } from './active-patients-count-response';
import {DischargePatientsResponse} from './discharge-patients-response';
import {DischargePatientRequest} from './discharge-patient.request';


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
      : `${patientUrl}/nurse`;

    return this.http.get<PatientHistoryResponse>(url).pipe(
      map(response => {
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

  checkMedicalRecord(patientId: string): Observable<boolean> {
    return this.http.get<boolean>(`${patientUrl}/${patientId}/medical-record/check`).pipe(
      catchError(this.handleError('Failed to check medical record'))
    );
  }

  dischargePatient(patientId: string): Observable<any> {
    const request: DischargePatientRequest = { patientId };
    return this.http.put<any>(`${patientUrl}/discharge`, request).pipe(
      catchError(this.handleError('Failed to discharge patient'))
    );
  }

  getDischargePatients(searchTerm?: string): Observable<Patient[]> {
    const url = searchTerm
      ? `${patientUrl}/discharge/nurse?searchTerm=${encodeURIComponent(searchTerm)}`
      : `${patientUrl}/discharge/nurse`;

    return this.http.get<DischargePatientsResponse>(url).pipe(
      map(response => {
        if (response.status === 'EMPTY') return [];
        return this.searchMyPatientsAssembler.toEntitiesFromResponse(response as any);
      }),
      catchError(this.handleError('Failed to fetch discharge patients'))
    );
  }
}
