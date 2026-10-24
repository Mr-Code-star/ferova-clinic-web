export interface CreateTreatmentRequest {
  patientId: string;
  supplementName: string;
  quantity: string;
  dosingHours: string;
  durationDays: number;
}
