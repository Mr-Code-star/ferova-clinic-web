import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../domain/model/messages.entity';
import { SendMessageCommand } from '../domain/model/send-message.command';
import { ChatApiEndpoint } from './chat-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ChatApi extends BaseApi {
  private readonly chatEndpoint: ChatApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.chatEndpoint = new ChatApiEndpoint(http);
  }

  getMessages(id: string): Observable<Message[]> {
    return this.chatEndpoint.getAllById(id);
  }

  sendMessage(command: SendMessageCommand): Observable<Message> {
    return this.chatEndpoint.sendMessage(command);
  }
}
