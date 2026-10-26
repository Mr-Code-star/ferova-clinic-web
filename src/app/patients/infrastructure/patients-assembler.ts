import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Patient } from '../domain/model/patient.entity';
import { PatientResource, PatientResponse } from './patients-response';
import { AssignPatientCommand } from '../domain/model/assign-patient.command';
import { AssignPatientRequest } from './assign-patient.request';

export class PatientsAssembler implements BaseAssembler<Patient, PatientResource, PatientResponse> {
  toEntitiesFromResponse(response: PatientResponse): Patient[] {
    return response.data.map(resource => this.toEntityFromResource(resource as PatientResource));
  }

  toEntityFromResource(resource: PatientResource): Patient {
    return new Patient(
      {
        patientId: resource.patientId,
        patientName: resource.patientName,
        patientLastName: resource.patientLastName,
        gender: resource.gender,
        status: resource.status,
        assigmentStatus: resource.statusAssignment
      }
    );
  }

  toResourceFromEntity(entity: Patient): PatientResource {
    return {
      id: entity.id,
      patientId: entity.patientId,
      patientName: entity.patientName,
      patientLastName: entity.patientLastName,
      gender: entity.gender,
      status: entity.status,
      statusAssignment: entity.assigmentStatus
    };
  }

  toRequestFromCommand(command: AssignPatientCommand): AssignPatientRequest {
    return {
      patientId: command.patientId,
    }
  }

}
