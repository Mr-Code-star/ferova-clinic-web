export interface TreatmentResource {
  treatmentId: string;
  patientId: string;
  patientName: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  supplementName: string;
}

export interface NurseTreatmentsResponse {
  nurseId: string;
  treatments: TreatmentResource[];
}
