import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface HeatMapPointResource extends BaseResource {
  facilityName: string;
  lat: number;
  lng: number;
  riskLevel: RiskLevel;
  adherenceRate: number;
}

export interface HeatMapPointResponse  extends BaseResponse {
  points: HeatMapPointResource[];
}
