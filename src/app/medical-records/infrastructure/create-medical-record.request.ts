export interface AntecedenteRequest {
  type: string;
  description: string;
}

export interface CreateMedicalRecordRequest {
  patientId: string;
  weight: number;
  height: number;
  motivoConsulta: string;
  observaciones: string;
  antecedentes: AntecedenteRequest[];
  sintomas: string[];
}
