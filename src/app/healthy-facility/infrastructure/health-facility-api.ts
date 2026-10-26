import { inject, Injectable } from '@angular/core';
import { HealthFacilityApiEndpoint } from './health-facility-api-endpoint';
import { Observable } from 'rxjs';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { Appointment } from '../domain/model/appointment.entity';
import {HealthFacilityList} from '../domain/model/health-facility-list.entity';
import {AssignNurseRequest, AssignNurseResponse, CanRegisterResponse} from './assign-nurse-response';
import {UnassignedNurse} from '../domain/model/unassigned-nurse.entity';

@Injectable({ providedIn: 'root' })
export class HealthFacilityApi {
  private readonly endpoint = inject(HealthFacilityApiEndpoint);

  getMyFacility(): Observable<HealthFacility | null> {
    return this.endpoint.getMyFacility();
  }

  getTopAppointments(limit: number = 4): Observable<Appointment[]> {
    return this.endpoint.getTopAppointments(limit);
  }

  getAllNurseAppointments(): Observable<Appointment[]> {
    return this.endpoint.getAllNurseAppointments();
  }

  getAllFacilities(): Observable<HealthFacilityList[]> {
    return this.endpoint.getAllFacilities()
  }

  checkCanRegister(): Observable<CanRegisterResponse> {
    return this.endpoint.checkCanRegister();
  }

  getUnassignedNurses(): Observable<UnassignedNurse[]> {
    return this.endpoint.getUnassignedNurses();
  }

  assignNurse(request: AssignNurseRequest): Observable<AssignNurseResponse> {
    return this.endpoint.assignNurse(request);
  }
}
