import { environment } from '../../../envirotments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicalRecordAssembler } from './medical-record.assembler';
import { map, Observable } from 'rxjs';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { MedicalRecordDetailResponse } from './medical-record-detail-response';
import { CreateMedicalRecordCommand } from '../domain/model/create-medical-record.command';
import { CreateMedicalRecordRequest } from './create-medical-record.request';

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
}
