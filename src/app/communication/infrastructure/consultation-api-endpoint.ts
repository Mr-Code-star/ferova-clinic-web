import { Injectable } from '@angular/core';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { ConsultationAssembler } from './consultation-assembler';
import { environment } from '../../../environment/environment.development';
import { catchError, map, Observable } from 'rxjs';
import {
  ConsultationResource,
  ConsultationsApiResponse,
  InboxStatusResource,
} from './consultation-response';
import { Consultation } from '../domain/model/consultation.entity';
import { InboxStatus } from '../domain/model/consultation-status.entity';

// Resultado que devolverá el endpoint al Store
export interface InboxResult {
  consultations: Consultation[];
  status: InboxStatus | null;
}

const communicationUrl = `${environment.serverBasePath}${environment.communicationEndpointPath}/consultations`;

@Injectable({ providedIn: 'root' })
export class ConsultationApiEndpoint extends BaseApiEndpoint<any, any, any, any> {

  constructor(http: HttpClient) {
    super(http, communicationUrl, new ConsultationAssembler());
  }

  /**
   * Sobrescribimos getAll para manejar el caso especial
   * en el que la respuesta es un objeto de estado (ej. NO_CONSULTAS)
   * en lugar de un array de consultas.
   */
  override getAll(): Observable<any> {
    return this.http.get<ConsultationsApiResponse>(`${communicationUrl}/nurse`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          // Es un array de consultas
          return {
            consultations: response.map((res) =>
              this.assembler.toEntityFromResource(res as ConsultationResource)
            ),
            status: null,
          } as InboxResult;
        } else {
          // Es un objeto de estado (ej. NO_CONSULTAS, SIN_PACIENTES)
          return {
            consultations: [],
            status: this.assembler.toStatusFromResource(response as InboxStatusResource),
          } as InboxResult;
        }
      }),
      catchError(this.handleError('Failed to fetch consultations'))
    );
  }

  /**
   * Método personalizado para búsqueda por término.
   * (El BaseApiEndpoint no lo tiene, así que lo añadimos).
   */
  search(searchTerm: string): Observable<InboxResult> {
    return this.http.get<ConsultationsApiResponse>(`${communicationUrl}/nurse?searchTerm=${encodeURIComponent(searchTerm)}`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return {
            consultations: response.map((res) =>
              this.assembler.toEntityFromResource(res as ConsultationResource)
            ),
            status: null,
          } as InboxResult;
        }
        return {
          consultations: [],
          status: this.assembler.toStatusFromResource(response as InboxStatusResource),
        } as InboxResult;
      }),
      catchError(this.handleError('Failed to search consultations'))
    );
  }

  /**
   * Cierra una consulta enviando el ID en el body (DELETE).
   * @param consultationId - El ID de la consulta a cerrar.
   */
  closeConsultation(consultationId: string): Observable<void> {
    // Creamos el body tal cual lo pide Swagger
    const body = { consultationId: consultationId };

    // En Angular, para enviar un body en un DELETE, debemos usar el objeto options
    const options = {
      body: body
    };

    return this.http.delete<void>(`${communicationUrl}/close`, options);
  }
}
