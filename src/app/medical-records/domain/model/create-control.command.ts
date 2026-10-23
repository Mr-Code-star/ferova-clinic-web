export class CreateControlCommand {
  private readonly _patientId: string;
  private readonly _hemoglobinLevel: number;

  constructor(data: { patientId: string; hemoglobinLevel: number }) {
    this._patientId = data.patientId;
    this._hemoglobinLevel = data.hemoglobinLevel;
  }

  get patientId(): string { return this._patientId; }
  get hemoglobinLevel(): number { return this._hemoglobinLevel; }
}
