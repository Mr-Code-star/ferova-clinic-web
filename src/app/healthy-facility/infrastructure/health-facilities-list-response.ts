export interface HealthFacilityListResource {
  id: string;
  name: string;
  address: string;
  assignedNurseName: string | null;
  hasNurseAssigned: boolean;
  displayMessage: string | null;
}

export interface HealthFacilitiesListResponse {
  total: number;
  healthFacilities: HealthFacilityListResource[];
}
