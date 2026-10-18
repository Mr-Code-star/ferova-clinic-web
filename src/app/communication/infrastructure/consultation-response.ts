import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { InboxStatus } from '../domain/model/consultation-status.entity';

export interface ConsultationResource extends BaseResource {
  consultationId: string;
  patientId: string;
  patientName: string;
  motherId: string;
  motherName: string;
  nurseId: string;
  lastMessage: string;
  lastMessageDate: string;
  createdAt: string;
  messageCount: number;
}

// Cuando no hay consultas, el backend devuelve esto
export interface InboxStatusResource extends BaseResponse {
  consultations: [];
  message: string;
  detail: string;
  searchTerm?: string;
  action?: string;
  status: InboxStatus['status'];
}

// La respuesta puede ser un Array o un Objeto de estado
export type ConsultationsApiResponse = ConsultationResource[] | InboxStatusResource;
