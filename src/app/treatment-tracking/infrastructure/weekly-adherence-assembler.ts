import { WeeklyAdherence, WeeklyAdherenceDay } from '../domain/model/weekly-adherence.entity';
import { WeeklyAdherenceResponse } from './treatment-detail-response';

export class WeeklyAdherenceAssembler {
  toEntityFromResponse(response: WeeklyAdherenceResponse): WeeklyAdherence {
    return new WeeklyAdherence(
      response.patientId,
      response.treatmentId,
      response.days.map(d => new WeeklyAdherenceDay(d.date, d.dayLabel, d.status, d.heightPercentage)),
    );
  }
}
