import { inject, Injectable } from '@angular/core';
import { HealthFacilityApiEndpoint } from './health-facility-api-endpoint';
import { Observable } from 'rxjs';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { Appointment } from '../domain/model/appointment.entity';

@Injectable({ providedIn: 'root' })
export class HealthFacilityApi {
  private readonly endpoint = inject(HealthFacilityApiEndpoint);

  getMyFacility(): Observable<HealthFacility | null> {
    return this.endpoint.getMyFacility();
  }

  getTopAppointments(limit: number = 4): Observable<Appointment[]> {
    return this.endpoint.getTopAppointments(limit);
  }
}
