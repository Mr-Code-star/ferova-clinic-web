import { NurseTreatment } from '../domain/model/nurse-treatment.entity';
import { NurseTreatmentsResponse } from './nurse-treatments-response';

export class NurseTreatmentsAssembler {
  toEntitiesFromResponse(response: NurseTreatmentsResponse): NurseTreatment[] {
    return response.treatments.map(res => new NurseTreatment({
      treatmentId: res.treatmentId,
      patientId: res.patientId,
      patientName: res.patientName,
      status: res.status,
      supplementName: res.supplementName
    }));
  }
}
