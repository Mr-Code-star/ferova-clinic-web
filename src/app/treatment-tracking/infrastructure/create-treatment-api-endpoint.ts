import {Injectable} from '@angular/core';
import {CreateTreatmentAssembler} from './create-treatment-assembler';
import {CreateTreatmentCommand} from '../domain/model/create-treatment.command';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

const createTreatmentUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}/treatments`;

@Injectable({providedIn: "root"})
export class CreateTreatmentApiEndpoint {
  private readonly createTreatmentAssembler = new CreateTreatmentAssembler();

  constructor(private http: HttpClient) {
  }
  createTreatment(command: CreateTreatmentCommand): Observable<any> {
    const request = this.createTreatmentAssembler.toRequestFromCommand(command);
    return this.http.post<any>(`${createTreatmentUrl}`, request);
  }
}
