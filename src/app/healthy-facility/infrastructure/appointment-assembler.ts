import { Appointment } from '../domain/model/appointment.entity';
import { AppointmentResource } from './appointment-response';

export class AppointmentAssembler {
  toEntitiesFromResponse(resources: AppointmentResource[]): Appointment[] {
    return resources.map(res => this.toEntityFromResource(res));
  }

  toEntityFromResource(resource: AppointmentResource): Appointment {
    return new Appointment({
      appointmentId: resource.appointmentId,
      patientId: resource.patientId,
      patientName: resource.patientName,
      facilityId: resource.facilityId,
      facilityName: resource.facilityName,
      appointmentDate: resource.appointmentDate,
      appointmentTime: resource.appointmentTime,
      status: resource.status
    });
  }
}
