import { AnemiaStatus } from '../domain/model/control.entity';

export type TrendType = 'UP' | 'DOWN' | 'STABLE';

export interface ControlResource {
  id: string;
  date: string;
  hemoglobinLevel: number;
  anemiaStatus: AnemiaStatus;
}

export interface ControlHistoryResponse {
  patientId: string;
  patientName: string;
  controls: ControlResource[];
  averageHemoglobin: number;
  totalControls: number;
  evolution: number;
  trend: TrendType;
}
