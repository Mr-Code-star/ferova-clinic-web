import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class RiskPatient implements BaseEntity {
  private _patientId: string;
  private _patientName: string;
  private _patientAge: number;
  private _score: number;
  private _hoursWithoutConfirmation: number;

  constructor(data: {
    patientId: string;
    patientName: string;
    patientAge: number;
    score: number;
    hoursWithoutConfirmation: number;
  }) {
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._patientAge = data.patientAge;
    this._score = data.score;
    this._hoursWithoutConfirmation = data.hoursWithoutConfirmation;
  }

  get id(): string | null { return this._patientId; }
  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get patientAge(): number { return this._patientAge; }
  get score(): number { return this._score; }
  get hoursWithoutConfirmation(): number { return this._hoursWithoutConfirmation; }

  get initials(): string {
    const parts = this._patientName.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return this._patientName.substring(0, 2).toUpperCase();
  }
}
