import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { SenderRole } from '../domain/model/messages.entity';


export interface MessageResource extends BaseResource {
  id: string | null;
  senderId: string;
  senderRole: SenderRole;
  content: string;
  sentAt: string;
}

export interface MessageResponse extends BaseResponse {
  consultationId: string;
  messages: MessageResource[]
}
