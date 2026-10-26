import { Injectable } from '@angular/core';
import { HealthFacilityAssembler } from './health-facility-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { HealthFacilityResponse } from './health-facility-response';
import { environment } from '../../../environment/environment';
import { Appointment } from '../domain/model/appointment.entity';
import { AppointmentsResponse, NurseAppointmentsResponse } from './appointment-response';
import { AppointmentAssembler } from './appointment-assembler';
import {HealthFacilityList} from '../domain/model/health-facility-list.entity';
import {HealthFacilitiesListResponse} from './health-facilities-list-response';
import {HealthFacilitiesListAssembler} from './health-facilities-list-assembler';
import {DistrictResource} from './district-response';
import {CreateHealthFacilityRequest} from './create-health-facility.request';
import {
  AssignNurseRequest,
  AssignNurseResponse,
  CanRegisterResponse,
  UnassignedNursesResponse
} from './assign-nurse-response';
import {UnassignedNurse} from '../domain/model/unassigned-nurse.entity';

const healthFacilityUrl = `${environment.serverBasePath}${environment.healthyEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class HealthFacilityApiEndpoint {
  private readonly assembler = new HealthFacilityAssembler();
  private readonly appointmentAssembler = new AppointmentAssembler();
  private readonly listAssembler = new HealthFacilitiesListAssembler();

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

  getAllFacilities(): Observable<HealthFacilityList[]> {
    return this.http.get<HealthFacilitiesListResponse>(`${healthFacilityUrl}`).pipe(
      map(response => this.listAssembler.toEntitiesFromResponse(response))
    );
  }

  getDistricts(): Observable<DistrictResource[]> {
    return this.http.get<DistrictResource[]>(`${healthFacilityUrl}/districts`);
  }

  createFacility(request: CreateHealthFacilityRequest): Observable<any> {
    return this.http.post<any>(`${healthFacilityUrl}`, request);
  }

  checkCanRegister(): Observable<CanRegisterResponse> {
    return this.http.get<CanRegisterResponse>(`${healthFacilityUrl}/can-register`);
  }

  getUnassignedNurses(): Observable<UnassignedNurse[]> {
    return this.http.get<UnassignedNursesResponse>(`${healthFacilityUrl}/nurses/unassigned`).pipe(
      map(response => response.data.map(n => new UnassignedNurse(n.id, n.fullName)))
    );
  }

  assignNurse(request: AssignNurseRequest): Observable<AssignNurseResponse> {
    return this.http.post<AssignNurseResponse>(`${healthFacilityUrl}/assign-nurse`, request);
  }

}
