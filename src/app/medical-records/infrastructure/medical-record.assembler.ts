import { MedicalRecordDetailResponse } from './medical-record-detail-response';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Control } from '../domain/model/control.entity';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { CreateMedicalRecordRequest } from './create-medical-record.request';

export class MedicalRecordAssembler {
  toEntityFromResponse(response: MedicalRecordDetailResponse): MedicalRecord {
    return new MedicalRecord({
      id: response.id,
      patientId: response.patientId,
      patientName: response.patientName,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      hemoglobinLevel: response.hemoglobinLevel,
      weight: response.weight,
      height: response.height,
      gender: response.gender,
      antecedentes: (response.antecedentes || []).map(a => ({
        type: a.type,
        description: a.description
      })),
      motivoConsulta: response.motivoConsulta,
      observaciones: response.observaciones,
      sintomas: response.sintomas,
      controls: response.controls.map(c => new Control({
        id: c.id,
        date: c.date,
        hemoglobinLevel: c.hemoglobinLevel,
        anemiaStatus: c.anemiaStatus
      })),
      nurseId: response.nurseId
    });
  }

  toRequestCreateMedicalRecord(command: CreateMedicalRecordCommand ): CreateMedicalRecordRequest  {
    return {
      patientId: command.patientId,
      weight: command.weight,
      height: command.height,
      motivoConsulta: command.motivoConsulta,
      observaciones: command.observaciones,
      antecedentes: command.antecedentes,
      sintomas: command.sintomas,

    }
  }
}
