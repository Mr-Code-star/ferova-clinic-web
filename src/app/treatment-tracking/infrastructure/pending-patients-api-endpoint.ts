import {Injectable} from '@angular/core';
import {PendingPatientsAssembler} from './pending-patients-assembler';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PendingPatientsResponse} from './pending-patients-response';
import {environment} from '../../../environment/environment';

const pendingUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}/nurses/pending-patients`;

@Injectable({providedIn: "root"})
export class PendingPatientsApiEndpoint {
  private readonly assembler = new PendingPatientsAssembler();

  constructor(private http: HttpClient) {
  }

  getPendingPatients(): Observable<PendingPatientsResponse> {
    return this.http.get<PendingPatientsResponse>(`${pendingUrl}`);
  }
}
