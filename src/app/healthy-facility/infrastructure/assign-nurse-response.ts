export interface CanRegisterResponse {
  canRegister: boolean;
  message: string;
  details: string | null;
}

export interface UnassignedNurseResource {
  id: string;
  fullName: string;
}

export interface UnassignedNursesResponse {
  success: boolean;
  data: UnassignedNurseResource[];
}

export interface AssignNurseRequest {
  facilityId: string;
  nurseId: string;
}

export interface AssignNurseResponse {
  message: string;
}
