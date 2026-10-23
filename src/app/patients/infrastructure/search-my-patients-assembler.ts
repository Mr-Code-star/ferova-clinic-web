import { Patient } from '../domain/model/patient.entity';
import { PatientHistoryResource, PatientHistoryResponse } from './search-my-patients-response';

export class SearchMyPatientsAssembler {

  toEntitiesFromResponse(response: PatientHistoryResponse): Patient[] {
    return response.data.patients.map(res => this.toEntityFromResource(res));
  }

  toEntityFromResource(resource: PatientHistoryResource): Patient {
    return new Patient({
      patientId: resource.id,
      patientName: resource.name,
      patientLastName: resource.lastName,
      gender: resource.gender === 0 ? 'MALE' : 'FEMALE',
      status: 'ACTIVE',
      assigmentStatus: 'ASSIGNED', // Como vienen de /nurse, están asignados
      birthDate: resource.birthDate.value // ⬅️ Necesario para la edad
    });
  }
}
