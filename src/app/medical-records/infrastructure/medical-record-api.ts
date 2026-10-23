import { inject, Injectable } from '@angular/core';
import { MedicalRecordApiEndpoint } from './medical-record-api-endpoint';
import { Observable } from 'rxjs';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { CreateControlCommand } from '../domain/model/create-control.command';
import { ControlHistoryResponse } from './control-history-reponse';

@Injectable({ providedIn: 'root' })
export class MedicalRecordApi {
  private readonly endpoint = inject(MedicalRecordApiEndpoint);

  getMedicalRecord(patientId: string): Observable<MedicalRecord> {
    return this.endpoint.getByPatientId(patientId);
  }

  createMedicalRecord(command: CreateMedicalRecordCommand): Observable<any> {
    return this.endpoint.postMedicalRecord(command);
  }

  checkMedicalRecordExists(patientId: string): Observable<boolean> {
    return this.endpoint.checkMedicalRecordExists(patientId);
  }

  updateMedicalRecord(command: CreateMedicalRecordCommand): Observable<any> {
    return this.endpoint.putMedicalRecord(command);
  }

  createHemoglobinControl(command: CreateControlCommand): Observable<any> {
    return this.endpoint.postHemoglobinControl(command);
  }

  getControlsByMedicalRecordId(medicalRecordId: string): Observable<ControlHistoryResponse> {
    return this.endpoint.getControlsByMedicalRecordId(medicalRecordId);
  }
}
