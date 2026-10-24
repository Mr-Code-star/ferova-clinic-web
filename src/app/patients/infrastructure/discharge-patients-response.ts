export interface DischargePatientResource {
  id: string;
  name: string;
  lastName: string;
  birthDate: { value: string };
  currentWeight: { value: number };
  currentHeight: { value: number };
  motherId: string;
  nurseId: string;
  gender: number;
  facilityId: string;
  status: number;
  medicalRecord: any | null;
}

export interface DischargePatientsResponse {
  success: boolean;
  status: string; // 'SUCCESS' | 'EMPTY'
  message: string;
  data: {
    patients: DischargePatientResource[];
    total: number;
    searchTerm: string | null;
    nurseId: string;
  };
}
