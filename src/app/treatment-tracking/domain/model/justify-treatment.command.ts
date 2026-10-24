export class JustifyTreatmentCommand {
  private readonly _treatmentId: string;
  private readonly _observation: string;

  constructor(data: { treatmentId: string; observation: string }) {
    this._treatmentId = data.treatmentId;
    this._observation = data.observation;
  }

  get treatmentId(): string { return this._treatmentId; }
  get observation(): string { return this._observation; }
}
