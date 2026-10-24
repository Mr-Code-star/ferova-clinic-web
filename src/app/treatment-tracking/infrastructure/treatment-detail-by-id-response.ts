export interface TreatmentDetailByIdResource {
  treatmentId: string;
  patientId: string;
  patientName: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  supplementName: string;
  quantity: string;
  dosingHours: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  adherenceScore: number;
  totalConfirmed: number;
  totalOmitted: number;
  completionObservation: string | null;
  abandonmentObservation: string | null;
}
