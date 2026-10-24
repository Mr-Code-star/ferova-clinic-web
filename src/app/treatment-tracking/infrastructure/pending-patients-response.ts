export interface PendingPatientResource {
  patientId: string;
  patientName: string;
}

export interface PendingPatientsResponse {
  nurseId: string;
  hasPatientsAssigned: boolean;
  hasPendingPatients: boolean;
  pendingPatients: PendingPatientResource[];
  message?: string;
}
