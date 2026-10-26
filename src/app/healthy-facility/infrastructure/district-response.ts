export interface DistrictResource {
  id: string;
  name: string;
}

export interface DistrictsResponse extends Array<DistrictResource> {}
