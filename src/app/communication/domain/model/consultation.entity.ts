export class Consultation {
  private _consultationId: string;
  private _patientId: string;
  private _patientName: string;
  private _motherId: string;
  private _motherName: string;
  private _nurseId: string;
  private _lastMessage: string;
  private _lastMessageDate: string;
  private _createdAt: string;
  private _messageCount: number;

  constructor(data: {
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
  }) {
    this._consultationId = data.consultationId;
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._motherId = data.motherId;
    this._motherName = data.motherName;
    this._nurseId = data.nurseId;
    this._lastMessage = data.lastMessage;
    this._lastMessageDate = data.lastMessageDate;
    this._createdAt = data.createdAt;
    this._messageCount = data.messageCount;
  }
  get id(): string | null { return this._consultationId; }

  get consultationId(): string { return this._consultationId; }
  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get motherId(): string { return this._motherId; }
  get motherName(): string { return this._motherName; }
  get nurseId(): string { return this._nurseId; }
  get lastMessage(): string { return this._lastMessage; }
  get lastMessageDate(): string { return this._lastMessageDate; }
  get createdAt(): string { return this._createdAt; }
  get messageCount(): number { return this._messageCount; }
}
