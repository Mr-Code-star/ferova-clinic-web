import { PendingPatient } from '../domain/model/pending-patient.entity';
import { PendingPatientsResponse } from './pending-patients-response';

export class PendingPatientsAssembler {
  toEntitiesFromResponse(response: PendingPatientsResponse): PendingPatient[] {
    return response.pendingPatients.map(res => new PendingPatient(res));
  }
}
