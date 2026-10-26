export class CreateMedicalRecordCommand {
  private readonly _patientId: string;
  private readonly _weight: number;
  private readonly _height: number;
  private readonly _motivoConsulta: string;
  private readonly _observaciones: string;
  private readonly _antecedentes: { type: string; description: string }[];
  private readonly _sintomas: string[];

  constructor(data: {
    patientId: string;
    weight: number;
    height: number;
    motivoConsulta: string;
    observaciones: string;
    antecedentes: { type: string; description: string }[];
    sintomas: string[];
  }) {
    this._patientId = data.patientId;
    this._weight = data.weight;
    this._height = data.height;
    this._motivoConsulta = data.motivoConsulta;
    this._observaciones = data.observaciones;
    this._antecedentes = data.antecedentes;
    this._sintomas = data.sintomas;
  }

  get patientId(): string { return this._patientId; }
  get weight(): number { return this._weight; }
  get height(): number { return this._height; }
  get motivoConsulta(): string { return this._motivoConsulta; }
  get observaciones(): string { return this._observaciones; }
  get antecedentes(): { type: string; description: string }[] { return this._antecedentes; }
  get sintomas(): string[] { return this._sintomas; }
}
