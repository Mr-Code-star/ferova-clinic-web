export interface TreatmentDetailResource {
  patientId: string;
  patientName: string;
  patientYearOld: number;
  motherName: string;
  score: number;
  riskLevel: string; // 'LOW' | 'MEDIUM' | 'HIGH'
  adherenceScore: number;
  totalConfirmed: number;
  totalOmitted: number;
  supplementName: string;
  quantity: string;
  dosageHours: string;
  startDate: string;
  endDate: string;
}

export interface TreatmentDetailResponse {
  success: boolean;
  data: TreatmentDetailResource;
}

export interface TreatmentResource {
  supplementName: string;
  quantity: string;
  dosageHours: string;
  durationDays: number;
  startDate: string;
  endDate: string;
}

export interface TreatmentDetailResource {
  patientId: string;
  patientName: string;
  patientYearOld: number;
  motherName: string;
  score: number;
  riskLevel: string;
  adherenceScore: number;
  totalConfirmed: number;
  totalOmitted: number;
  treatment: TreatmentResource; // ⬅️ Objeto anidado
}

export interface WeeklyAdherenceDay {
  date: string;              // "2026-10-17"
  dayLabel: string;          // "vie"
  status: 'CONFIRMED' | 'OMITTED' | 'PENDING' | 'NO_DOSE';
  heightPercentage: number;  // 0-100
}

export interface WeeklyAdherenceResponse {
  patientId: string;
  treatmentId: string;
  days: WeeklyAdherenceDay[];
}

export interface NextDoseResponse {
  hasNextDose: boolean;
  dailyDoseId?: string;
  scheduledDate?: string;
  dayLabel?: string;
  dosageHours?: string;
  status?: string;
  daysFromToday?: number;
  message?: string;
}
