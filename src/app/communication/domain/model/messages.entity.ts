import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type SenderRole = 'MOTHER' | 'NURSE';

export class Message implements BaseEntity {
  private _messageId: string | null;
  private _senderId: string;
  private _senderRole: SenderRole;
  private _content: string;
  private _sentAt: string;

  constructor(message: {
    messageId: string | null,
    senderId: string,
    senderRole: SenderRole,
    content: string,
    sentAt: string
  }) {
    this._messageId = message.messageId;
    this._senderId = message.senderId;
    this._senderRole = message.senderRole;
    this._content = message.content;
    this._sentAt = message.sentAt;
  }

  get id(): string | null { return this._messageId; }

  get messageId(): string | null { return this._messageId; }

  get senderId(): string { return this._senderId; }

  get senderRole(): SenderRole { return this._senderRole; }

  get content(): string { return this._content; }

  get sentAt(): string { return this._sentAt; }

  set senderId(value: string) { this._senderId = value; }

  set senderRole(value: SenderRole) { this._senderRole = value; }

  set content(value: string) { this._content = value; }

  set sentAt(value: string) { this._sentAt = value; }
}
