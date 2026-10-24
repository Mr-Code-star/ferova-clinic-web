export class CreateTreatmentCommand {
  private readonly _patientId: string;
  private readonly _supplementName: string;
  private readonly _quantity: string;
  private readonly _dosingHours: string;
  private readonly _durationDays: number;

  constructor(data: {
    patientId: string;
    supplementName: string;
    quantity: string;
    dosingHours: string;
    durationDays: number;
  }) {
    this._patientId = data.patientId;
    this._supplementName = data.supplementName;
    this._quantity = data.quantity;
    this._dosingHours = data.dosingHours;
    this._durationDays = data.durationDays;
  }

  get patientId(): string { return this._patientId; }
  get supplementName(): string { return this._supplementName; }
  get quantity(): string { return this._quantity; }
  get dosageHours(): string { return this._dosingHours; }
  get durationDays(): number { return this._durationDays; }
}
