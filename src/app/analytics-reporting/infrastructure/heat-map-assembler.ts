import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { HeatMap } from '../domain/model/heat-map.entity';
import { HeatMapPointResource, HeatMapPointResponse } from './heat-map-response';

/**
 * The HeatMapAssembler class is responsible for converting between HeatMap entities and HeatMapPointResource objects, as well as converting HeatMapPointResponse objects to arrays of HeatMap entities.
 */
export class HeatMapAssembler implements BaseAssembler<HeatMap, HeatMapPointResource, HeatMapPointResponse> {

  /**
   * Converts a HeatMapPointResource to a HeatMap entity.
   * @param resource
   */
  toEntityFromResource(resource: HeatMapPointResource): HeatMap {
    return new HeatMap({id: resource.id, name: resource.facilityName, latitude: resource.lat, longitude: resource.lng, riskLevel: resource.riskLevel, adherenceRate: resource.adherenceRate});
  }

  /**
   * Converts a HeatMap entity to a HeatMapPointResource.
   * @param entity
   */
  toResourceFromEntity(entity: HeatMap): HeatMapPointResource {
    return {id: entity.id, facilityName: entity.name, lat: entity.latitude, lng: entity.longitude, riskLevel: entity.riskLevel, adherenceRate: entity.adherenceRate};
  }

  /**
   * Converts a HeatMapPointResponse to an array of HeatMap entities.
   * @param response
   */
  toEntitiesFromResponse(response: HeatMapPointResponse): HeatMap[] {
    return response.points.map(resource => this.toEntityFromResource(resource as HeatMapPointResource));
  }
}
