export interface PatientHistoryResource {
  id: string;
  name: string;
  lastName: string;
  birthDate: {
    value: string;
  };
  currentWeight: {
    value: number;
  };
  currentHeight: {
    value: number;
  };
  motherId: string;
  nurseId: string;
  gender: number; // 0 o 1
  facilityId: string;
  status: number;
  medicalRecord: any | null;
}

export interface PatientHistoryResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    patients: PatientHistoryResource[];
    total: number;
    searchTerm: string | null;
    nurseId: string;
  };
}
