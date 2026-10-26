import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RiskPatientResource extends BaseResource{
  patientId: string;
  patientName: string;
  patientAge: number;
  score: number;
  hoursWithoutConfirmation: number;
}

export interface RiskPatientsResponse extends BaseResponse {
  riskLevel: string;
  total: number;
  patients: RiskPatientResource[];
}
