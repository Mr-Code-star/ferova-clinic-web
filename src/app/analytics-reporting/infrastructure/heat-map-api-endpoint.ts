import { environment } from '../../../environment/environment.development';
import { Injectable } from '@angular/core';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { HeatMap } from '../domain/model/heat-map.entity';
import { HeatMapPointResource, HeatMapPointResponse } from './heat-map-response';
import { HeatMapAssembler } from './heat-map-assembler';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AdminDashboardSummary} from '../domain/model/admin-dashboard-summary.entity';
import {AdminDashboardSummaryResponse} from './admin-dashboard-summary-response';
import {FacilityStatus} from '../domain/model/facility-status.entity';
import {TopFacilitiesResponse} from './facility-status-response';


const analyticsUrl = `${environment.serverBasePath}${environment.analyticsEndpointPath}/heatmap`;

@Injectable({providedIn: 'root'})
export class HeatMapApiEndpoint extends BaseApiEndpoint<HeatMap, HeatMapPointResource, HeatMapPointResponse, HeatMapAssembler>{
  constructor(http: HttpClient) {
    super(http, analyticsUrl, new HeatMapAssembler());
  }
}
