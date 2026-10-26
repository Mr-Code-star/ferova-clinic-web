import { Injectable } from '@angular/core';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Message } from '../domain/model/messages.entity';
import { MessageResource, MessageResponse } from './chat-response';
import { ChatAssembler } from './chat-assembler';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { SendMessageCommand } from '../domain/model/send-message.command';
import { map, Observable } from 'rxjs';

const communicationChatUrl = `${environment.serverBasePath}${environment.communicationEndpointPath}/chat`;

@Injectable({ providedIn: 'root' })
export class ChatApiEndpoint extends BaseApiEndpoint<Message, MessageResource, MessageResponse, ChatAssembler> {

  constructor(http: HttpClient) {
    super(http, communicationChatUrl, new ChatAssembler());
  }

  override getAllById(consultationId: string): Observable<Message[]> {
    return this.http.get<MessageResponse>(`${communicationChatUrl}/${consultationId}`).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }

  sendMessage(command: SendMessageCommand): Observable<Message> {
    const request = this.assembler.toRequestSendMessage(command);
    return this.http.post<MessageResource>(
      `${communicationChatUrl}/send-message`,
      request
    ).pipe(
      map(resource => this.assembler.toEntityFromResource(resource))
    );
  }
}
