import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RiskPatient } from '../domain/model/risk-patient.entity';
import { RiskPatientResource, RiskPatientsResponse } from './risk-patients-response';

export class RiskPatientsAssembler implements BaseAssembler<RiskPatient, RiskPatientResource, RiskPatientsResponse> {
  toEntitiesFromResponse(response: RiskPatientsResponse): RiskPatient[] {
    return response.patients.map(resource => this.toEntityFromResource(resource as RiskPatientResource))
  }

  toEntityFromResource(resource: RiskPatientResource): RiskPatient {
    return new RiskPatient({
      patientId: resource.patientId,
      patientName: resource.patientName,
      patientAge: resource.patientAge,
      score: resource.score,
      hoursWithoutConfirmation: resource.hoursWithoutConfirmation,
    });
  }

  toResourceFromEntity(entity: RiskPatient): RiskPatientResource {
    return {id: entity.patientId, patientId: entity.patientId, patientName: entity.patientName, patientAge: entity.patientAge, score: entity.score, hoursWithoutConfirmation: entity.hoursWithoutConfirmation };
  }

}
