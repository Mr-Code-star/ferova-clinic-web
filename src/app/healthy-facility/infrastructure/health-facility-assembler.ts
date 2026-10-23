import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { HealthFacility } from '../domain/model/health-facility.entity';
import { HealthFacilityResource, HealthFacilityResponse } from './health-facility-response';

export class HealthFacilityAssembler implements BaseAssembler<HealthFacility, HealthFacilityResource, HealthFacilityResponse>{

  toEntitiesFromResponse(response: HealthFacilityResponse): HealthFacility[] {
    if (!response.data) {
      return [];
    }
    // Si data es un objeto, lo envolvemos en un array
    return [this.toEntityFromResource(response.data)];
  }

  toEntityFromResource(resource: HealthFacilityResource): HealthFacility {
    return new HealthFacility(
      {
        facilityId: resource.facilityId,
        facilityName: resource.facilityName,
        address: resource.address,
        districtId: resource.districtId,
        districtName: resource.districtName,
        latitude: resource.latitude,
        longitude: resource.longitude,
        phoneNumber: resource.phoneNumber,
        status: resource.status,
        services: resource.services,
        availableDays: resource.availableDays,
        availableSlots: resource.availableSlots,
        scheduleOfOperation: resource.scheduleOfOperation
      }
    )
  }

  toResourceFromEntity(entity: HealthFacility): HealthFacilityResource {
    return {
      id: entity.id,
      facilityId: entity.facilityId,
      facilityName: entity.facilityName,
      address: entity.address,
      districtId: entity.districtId,
      districtName: entity.districtName,
      latitude: entity.latitude,
      longitude: entity.longitude,
      phoneNumber: entity.phoneNumber,
      status: entity.status,
      services: entity.services,
      availableDays: entity.availableDays,
      availableSlots: entity.availableSlots,
      scheduleOfOperation: entity.scheduleOfOperation
    };
  }

}
