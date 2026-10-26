export interface FacilityStatusResource {
  facilityId: string;
  facilityName: string;
  districtName: string;
  adherenceRate: number;
  riskLevel: string;
  totalPatients: number;
  totalConfirmed: number;
  totalOmitted: number;
}

export interface TopFacilitiesResponse {
  facilities: FacilityStatusResource[];
}
