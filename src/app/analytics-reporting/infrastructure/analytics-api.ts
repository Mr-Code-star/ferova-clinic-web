import { BaseApi } from '../../shared/infrastructure/base-api';
import { Injectable } from '@angular/core';
import { HeatMapApiEndpoint } from './heat-map-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeatMap } from '../domain/model/heat-map.entity';

@Injectable({providedIn: 'root'})
export class AnalyticsApi extends BaseApi {
  private readonly heatMapEndpoint: HeatMapApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.heatMapEndpoint = new HeatMapApiEndpoint(http);
  }

  getPoints(): Observable<HeatMap[]> {
    return this.heatMapEndpoint.getAll();
  }

}
