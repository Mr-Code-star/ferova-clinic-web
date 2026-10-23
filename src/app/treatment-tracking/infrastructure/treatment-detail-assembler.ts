import { TreatmentDetail } from '../domain/model/treatment-detail.entity';
import { TreatmentDetailResource } from './treatment-detail-response';

export class TreatmentDetailAssembler {
  toEntityFromResource(resource: TreatmentDetailResource): TreatmentDetail {
    return new TreatmentDetail({
      patientId: resource.patientId,
      patientName: resource.patientName,
      patientYearOld: resource.patientYearOld,
      motherName: resource.motherName,
      score: resource.score,
      riskLevel: resource.riskLevel,
      adherenceScore: resource.adherenceScore,
      totalConfirmed: resource.totalConfirmed,
      totalOmitted: resource.totalOmitted,
      supplementName: resource.treatment.supplementName,
      quantity: resource.treatment.quantity,
      dosageHours: resource.treatment.dosageHours,
      startDate: resource.treatment.startDate,
      endDate: resource.treatment.endDate,
      durationDays: resource.treatment.durationDays
    });
  }
}
