import { Injectable } from '@angular/core';
import { HealthFacilityAssembler } from './health-facility-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { HealthFacilityResponse } from './health-facility-response';
import { environment } from '../../../envirotments/environment.development';
import { Appointment } from '../domain/model/appointment.entity';
import { AppointmentsResponse, NurseAppointmentsResponse } from './appointment-response';
import { AppointmentAssembler } from './appointment-assembler';

const healthFacilityUrl = `${environment.serverBasePath}${environment.healthyEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class HealthFacilityApiEndpoint {
  private readonly assembler = new HealthFacilityAssembler();
  private readonly appointmentAssembler = new AppointmentAssembler();

  constructor(private http: HttpClient) {}

  getMyFacility(): Observable<HealthFacility | null> {
    return this.http.get<HealthFacilityResponse>(`${healthFacilityUrl}/nurse/my-facility`).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          return null;
        }
        return this.assembler.toEntityFromResource(response.data);
      }),
    );
  }

  /**
   * GET /health-facilities/appointments/nurse/top?limit=4
   */
  getTopAppointments(limit: number = 4): Observable<Appointment[]> {
    return this.http
      .get<AppointmentsResponse>(`${healthFacilityUrl}/appointments/nurse/top?limit=${limit}`)
      .pipe(
        map((response) => {
          if (!response.success || !response.data) {
            return [];
          }
          return this.appointmentAssembler.toEntitiesFromResponse(response.data);
        }),
      );
  }

  getAllNurseAppointments(): Observable<Appointment[]> {
    return this.http
      .get<NurseAppointmentsResponse>(`${healthFacilityUrl}/appointments/nurse`)
      .pipe(
        map((response) => {
          // Como este endpoint devuelve un array directo, solo lo mapeamos
          if (!response || !Array.isArray(response)) return [];
          return this.appointmentAssembler.toEntitiesFromResponse(response);
        }),
      );
  }
}
