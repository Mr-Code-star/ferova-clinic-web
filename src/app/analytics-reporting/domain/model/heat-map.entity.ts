import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class HeatMap implements BaseEntity {
  private _id: string | null;
  private _name: string;
  private _latitude: number;
  private _longitude: number;
  private _riskLevel: RiskLevel;
  private _adherenceRate: number;

  constructor(points: {
    id: string | null;
    name: string;
    latitude: number;
    longitude: number;
    riskLevel: RiskLevel;
    adherenceRate: number;
  }) {
    this._id = points.id;
    this._name = points.name;
    this._latitude = points.latitude;
    this._longitude = points.longitude;
    this._riskLevel = points.riskLevel;
    this._adherenceRate = points.adherenceRate;
  }

  get id(): string | null { return this._id; }
  set id(value: string | null) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get latitude(): number { return this._latitude; }
  set latitude(value: number) { this._latitude = value; }

  get longitude(): number { return this._longitude; }
  set longitude(value: number) { this._longitude = value; }

  get riskLevel(): RiskLevel { return this._riskLevel; }
  set riskLevel(value: RiskLevel) { this._riskLevel = value; }

  get adherenceRate(): number { return this._adherenceRate; }
  set adherenceRate(value: number) { this._adherenceRate = value; }
}
