export class SendMessageCommand {
  private readonly _consultationId: string;
  private readonly _content: string;

  constructor(consultationId: string, content: string) {
    this._consultationId = consultationId;
    this._content = content;
  }

  get consultationId(): string { return this._consultationId; }
  get content(): string { return this._content; }
}
