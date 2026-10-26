export interface CreateHealthFacilityRequest {
  name: string;
  address: string;
  districtId: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  services: string[];
  availableDays: string[];
  availableSlots: string[];
}
