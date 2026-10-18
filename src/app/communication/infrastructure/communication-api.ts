import { BaseApi } from '../../shared/infrastructure/base-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConsultationApiEndpoint, InboxResult } from './consultation-api-endpoint';

@Injectable({ providedIn: 'root' })
export class CommunicationApi extends BaseApi {

  private readonly consultationEndpoint: ConsultationApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.consultationEndpoint = new ConsultationApiEndpoint(http);
  }

  /**
   *
   * @param searchTerm
   */
  getNurseConsultations(searchTerm?: string): Observable<InboxResult> {
    if (searchTerm) {
      return this.consultationEndpoint.search(searchTerm);
    }
    return this.consultationEndpoint.getAll();
  }

  /**
   * Cierra una consulta por su ID.
   */
  closeConsultation(consultationId: string): Observable<void> {
    return this.consultationEndpoint.closeConsultation(consultationId);
  }
}
