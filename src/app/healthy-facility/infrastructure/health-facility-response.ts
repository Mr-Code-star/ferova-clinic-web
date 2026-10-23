import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface HealthFacilityResource extends BaseResource{
  facilityId: string;
  facilityName: string;
  address: string;
  districtId?: string;
  districtName?: string;
  latitude?: number;
  longitude?: number;
  phoneNumber: string;
  status?: string;
  services: string[];
  availableDays?: string[];
  availableSlots?: string[];
  scheduleOfOperation?: string;

}

export interface HealthFacilityResponse extends BaseResponse{
  success: boolean;
  message?: string;
  data?: HealthFacilityResource;
}
