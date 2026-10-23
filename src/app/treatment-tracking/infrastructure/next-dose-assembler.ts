import { NextDose } from '../domain/model/next-dose.entity';
import { NextDoseResponse } from './treatment-detail-response';

export class NextDoseAssembler {
  toEntityFromResponse(response: NextDoseResponse): NextDose {
    return new NextDose(
      response.hasNextDose,
      response.dayLabel ?? null,
      response.dosageHours ?? null,
      response.scheduledDate ?? null,
      response.daysFromToday ?? null,
      response.message ?? null,
    );
  }
}
