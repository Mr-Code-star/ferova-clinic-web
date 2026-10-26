import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { AdminDashboardSummaryResponse } from './admin-dashboard-summary-response';
import { TopFacilitiesResponse } from './facility-status-response';
import { AdminDashboardSummary } from '../domain/model/admin-dashboard-summary.entity';
import { FacilityStatus } from '../domain/model/facility-status.entity';

const analyticsUrl = `${environment.serverBasePath}${environment.analyticsEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class AnalyticsApiEndpoint {

  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<AdminDashboardSummary> {
    return this.http.get<AdminDashboardSummaryResponse>(`${analyticsUrl}/dashboard/summary`).pipe(
      map(res => new AdminDashboardSummary(
        res.totalActiveFacilities,
        res.totalCriticalFacilities,
        res.globalAdherenceRate
      ))
    );
  }

  getTopFacilities(): Observable<FacilityStatus[]> {
    return this.http.get<TopFacilitiesResponse>(`${analyticsUrl}/facilities/top`).pipe(
      map(res => res.facilities.map(f => new FacilityStatus(
        f.facilityId,
        f.facilityName,
        f.districtName,
        f.adherenceRate,
        f.riskLevel as any,
        f.totalPatients,
        f.totalConfirmed,
        f.totalOmitted
      )))
    );
  }

  getAllFacilities(): Observable<FacilityStatus[]> {
    return this.http.get<TopFacilitiesResponse>(`${analyticsUrl}/facilities`).pipe(
      map(res => res.facilities.map(f => new FacilityStatus(
        f.facilityId,
        f.facilityName,
        f.districtName,
        f.adherenceRate,
        f.riskLevel as any,
        f.totalPatients,
        f.totalConfirmed,
        f.totalOmitted
      )))
    );
  }
}
