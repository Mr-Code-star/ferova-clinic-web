export class AssignPatientCommand {
  private readonly _patientId: string;

  constructor(patientId: string) {
    this._patientId = patientId;
  }

  get patientId(): string { return this._patientId; }
}
