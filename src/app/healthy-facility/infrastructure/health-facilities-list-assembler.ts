import { HealthFacilityList } from '../domain/model/health-facility-list.entity';
import { HealthFacilitiesListResponse } from './health-facilities-list-response';

export class HealthFacilitiesListAssembler {
  toEntitiesFromResponse(response: HealthFacilitiesListResponse): HealthFacilityList[] {
    return response.healthFacilities.map(res => new HealthFacilityList({
      id: res.id,
      name: res.name,
      address: res.address,
      assignedNurseName: res.assignedNurseName,
      hasNurseAssigned: res.hasNurseAssigned,
      displayMessage: res.displayMessage
    }));
  }
}
