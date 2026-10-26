import { environment } from '../../../environment/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicalRecordAssembler } from './medical-record.assembler';
import { map, Observable } from 'rxjs';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { MedicalRecordDetailResponse } from './medical-record-detail-response';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { CreateMedicalRecordRequest } from './create-medical-record.request';
import { CreateControlCommand } from '../domain/model/create-control.command';
import { CreateControlRequest } from './create-control.request';
import { ControlHistoryResponse } from './control-history-reponse';

const medicalRecordUrl = `${environment.serverBasePath}${environment.patientEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class MedicalRecordApiEndpoint {
  private readonly assembler = new MedicalRecordAssembler();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el historial médico de un paciente.
   * GET /api/patients/{patientId}/medical-record
   */
  getByPatientId(patientId: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecordDetailResponse>(`${medicalRecordUrl}/${patientId}/medical-record`).pipe(
      map(response => this.assembler.toEntityFromResponse(response))
    );
  }

  /**
   * Crea un nuevo historial médico.
   * POST /api/patients/medical-record
   */

  postMedicalRecord(command: CreateMedicalRecordCommand): Observable<MedicalRecord | any> {
    const request: CreateMedicalRecordRequest = this.assembler.toRequestCreateMedicalRecord(command);

    // Usamos <any> o <MedicalRecordDetailResponse> dependiendo de lo que devuelva tu backend
    return this.http.post<any>(`${medicalRecordUrl}/medical-record`, request).pipe(
      map(response => {
        // Si el backend devuelve el objeto completo, lo mapeamos
        if (response && response.id) {
          return this.assembler.toEntityFromResponse(response);
        }
        // Si el backend devuelve un 200/201 vacío o un mensaje, devolvemos un objeto dummy
        // para que el frontend sepa que fue exitoso.
        return { success: true };
      })
    );
  }

  /**
   * Verifica si el paciente ya tiene un historial médico.
   * GET /api/patients/{patientId}/medical-record/check
   */
  checkMedicalRecordExists(patientId: string): Observable<boolean> {
    return this.http.get<boolean>(`${medicalRecordUrl}/${patientId}/medical-record/check`);
  }

  /**
   * Actualiza un historial médico existente.
   * PUT /api/patients/medical-record/update
   */
  putMedicalRecord(command: CreateMedicalRecordCommand): Observable<MedicalRecord | any> {
    // Reutilizamos el assembler para mapear al request de actualización
    const request: CreateMedicalRecordRequest = this.assembler.toRequestCreateMedicalRecord(command);

    return this.http.put<any>(`${medicalRecordUrl}/medical-record/update`, request).pipe(
      map(response => {
        if (response && response.id) {
          return this.assembler.toEntityFromResponse(response);
        }
        return { success: true };
      })
    );
  }

  /**
   * Crea un nuevo control de hemoglobina.
   * POST /api/patients/hemoglobin-control
   */
  postHemoglobinControl(command: CreateControlCommand): Observable<any> {
    const request: CreateControlRequest = this.assembler.toRequestCreateControl(command);

    return this.http.post<any>(`${medicalRecordUrl}/hemoglobin-control`, request).pipe(
      map(response => {
        return { success: true, data: response };
      })
    );
  }

  /**
   * Obtiene el historial de controles de un registro médico.
   * GET /api/patients/medical-record/{medicalRecordId}/controls
   */
  getControlsByMedicalRecordId(medicalRecordId: string): Observable<ControlHistoryResponse> {
    return this.http.get<ControlHistoryResponse>(`${medicalRecordUrl}/medical-record/${medicalRecordId}/controls`);
  }

}
