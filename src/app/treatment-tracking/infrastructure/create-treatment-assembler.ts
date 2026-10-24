import {CreateTreatmentCommand} from '../domain/model/create-treatment.command';
import {CreateTreatmentRequest} from './create-treatment.request';

export class CreateTreatmentAssembler {
  toRequestFromCommand(command: CreateTreatmentCommand): CreateTreatmentRequest {
    return {
      patientId: command.patientId,
      supplementName: command.supplementName,
      quantity: command.quantity,
      dosingHours: command.dosageHours,
      durationDays: command.durationDays
    };
  }
}
