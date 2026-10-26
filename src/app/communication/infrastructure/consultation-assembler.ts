import { Consultation } from '../domain/model/consultation.entity';
import { InboxStatus } from '../domain/model/consultation-status.entity';
import { ConsultationResource, InboxStatusResource } from './consultation-response';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';

export class ConsultationAssembler implements BaseAssembler<any, any, any> {

  toEntityFromResource(resource: ConsultationResource): Consultation {
    return new Consultation({
      consultationId: resource.consultationId,
      patientId: resource.patientId,
      patientName: resource.patientName,
      motherId: resource.motherId,
      motherName: resource.motherName,
      nurseId: resource.nurseId,
      lastMessage: resource.lastMessage,
      lastMessageDate: resource.lastMessageDate,
      createdAt: resource.createdAt,
      messageCount: resource.messageCount,
    });
  }

  toStatusFromResource(resource: InboxStatusResource): InboxStatus {
    return new InboxStatus({
      status: resource.status,
      message: resource.message,
      detail: resource.detail,
      searchTerm: resource.searchTerm,
      action: resource.action,
    });
  }

  toResourceFromEntity(entity: Consultation): ConsultationResource {
    return {
      id: entity.id,
      consultationId: entity.consultationId,
      patientId: entity.patientId,
      patientName: entity.patientName,
      motherId: entity.motherId,
      motherName: entity.motherName,
      nurseId: entity.nurseId,
      lastMessage: entity.lastMessage,
      lastMessageDate: entity.lastMessageDate,
      createdAt: entity.createdAt,
      messageCount: entity.messageCount,
    } as ConsultationResource;
  }

  /**
   * Método requerido por la interfaz BaseAssembler.
   * Como la respuesta del backend puede ser un array o un objeto de estado,
   * usamos lógica condicional aquí.
   */
  toEntitiesFromResponse(response: any): any[] {
    // Si es un array → mapeamos cada consulta
    if (Array.isArray(response)) {
      return response.map((res: ConsultationResource) => this.toEntityFromResource(res));
    }

    // Si es un objeto con status → devolvemos un array con el estado
    if (response && response.status) {
      return [this.toStatusFromResource(response as InboxStatusResource)];
    }

    return [];
  }
}
