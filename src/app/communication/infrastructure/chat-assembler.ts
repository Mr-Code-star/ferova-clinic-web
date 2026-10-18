import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Message } from '../domain/model/messages.entity';
import { MessageResource, MessageResponse } from './chat-response';
import { SendMessageCommand } from '../domain/model/send-message.command';
import { SendMessageRequest } from './send-message-request';

export class ChatAssembler implements BaseAssembler<Message, MessageResource, MessageResponse> {


  toRequestSendMessage(command: SendMessageCommand): SendMessageRequest {
    return {
      consultationId: command.consultationId,
      content: command.content
    };
  }

  toEntityFromResource(resource: MessageResource): Message {
    return new Message({messageId: resource.id, senderId: resource.senderId, senderRole: resource.senderRole, content: resource.content, sentAt: resource.sentAt});
  }

  toResourceFromEntity(entity: Message): MessageResource {
    return {id: entity.id, senderId: entity.senderId, senderRole: entity.senderRole, content: entity.content, sentAt: entity.sentAt};
  }

  toEntitiesFromResponse(response: MessageResponse): Message[] {
    return response.messages.map(resource =>  this.toEntityFromResource(resource as MessageResource));
  }
}
