import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type AnemiaStatus = 'MILD' | 'MODERATE' | 'SEVERE' | 'CONTROLLED';

export class Control implements BaseEntity {
  private _id: string;
  private _date: string;
  private _hemoglobinLevel: number | null;
  private _anemiaStatus: AnemiaStatus;

  constructor(data: {
    id: string;
    date: string;
    hemoglobinLevel: number | null;
    anemiaStatus: AnemiaStatus;
  }) {
    this._id = data.id;
    this._date = data.date;
    this._hemoglobinLevel = data.hemoglobinLevel;
    this._anemiaStatus = data.anemiaStatus;
  }

  get id(): string { return this._id; }
  get date(): string { return this._date; }
  get hemoglobinLevel(): number | null { return this._hemoglobinLevel; }
  get anemiaStatus(): AnemiaStatus { return this._anemiaStatus; }
}
