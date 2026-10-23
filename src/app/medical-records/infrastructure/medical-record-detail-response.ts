import { AnemiaStatus } from '../domain/model/control.entity';
import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface AntecedenteResource {
  type: string;
  description: string;
}

export interface ControlResource {
  id: string;
  date: string;
  hemoglobinLevel: number;
  anemiaStatus: AnemiaStatus;
}

export interface MedicalRecordDetailResponse extends BaseResponse{
  id: string;
  patientId: string;
  patientName: string;
  createdAt: string;
  updatedAt: string;
  hemoglobinLevel: number | null;
  weight: number;
  height: number;
  gender: 'MALE' | 'FEMALE';
  antecedentes: AntecedenteResource[];
  motivoConsulta: string;
  observaciones: string;
  sintomas: string[];
  controls: ControlResource[];
  nurseId: string | null;
}
