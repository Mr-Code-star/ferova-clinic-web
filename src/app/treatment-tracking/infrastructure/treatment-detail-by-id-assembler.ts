import { TreatmentDetailById } from '../domain/model/treatment-detail-by-id.entity';
import { TreatmentDetailByIdResource } from './treatment-detail-by-id-response';

export class TreatmentDetailByIdAssembler {
  toEntityFromResource(resource: TreatmentDetailByIdResource): TreatmentDetailById {
    return new TreatmentDetailById({
      treatmentId: resource.treatmentId,
      patientId: resource.patientId,
      patientName: resource.patientName,
      status: resource.status,
      supplementName: resource.supplementName,
      quantity: resource.quantity,
      dosingHours: resource.dosingHours,
      durationDays: resource.durationDays,
      startDate: resource.startDate,
      endDate: resource.endDate,
      adherenceScore: resource.adherenceScore,
      totalConfirmed: resource.totalConfirmed,
      totalOmitted: resource.totalOmitted,
      completionObservation: resource.completionObservation,
      abandonmentObservation: resource.abandonmentObservation
    });
  }
}
