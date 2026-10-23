import { Control } from './control.entity';
import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type Gender = 'MALE' | 'FEMALE';

export interface Antecedente {
  type: string;
  description: string;
}

export class MedicalRecord implements BaseEntity {
  private _id: string;
  private _createdAt: string;
  private _updatedAt: string;
  private _hemoglobinLevel: number | null;
  private _weight: number;
  private _height: number;
  private _gender: Gender;
  private _antecedentes: Antecedente[];
  private _motivoConsulta: string;
  private _observaciones: string;
  private _sintomas: string[];
  private _controls: Control[];
  private _patientId: string;
  private _patientName: string;
  private _nurseId: string | null;

  constructor(data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    hemoglobinLevel: number | null;
    weight: number;
    height: number;
    gender: Gender;
    antecedentes: Antecedente[];
    motivoConsulta: string;
    observaciones: string;
    sintomas: string[];
    controls: Control[];
    patientId: string;
    patientName: string;
    nurseId: string | null;
  }) {
    this._id = data.id;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._hemoglobinLevel = data.hemoglobinLevel;
    this._weight = data.weight;
    this._height = data.height;
    this._gender = data.gender;
    this._antecedentes = data.antecedentes;
    this._motivoConsulta = data.motivoConsulta;
    this._observaciones = data.observaciones;
    this._sintomas = data.sintomas;
    this._controls = data.controls;
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._nurseId = data.nurseId;
  }

  get id(): string { return this._id; }
  get createdAt(): string { return this._createdAt; }
  get updatedAt(): string { return this._updatedAt; }
  get hemoglobinLevel(): number | null { return this._hemoglobinLevel; }
  get weight(): number { return this._weight; }
  get height(): number { return this._height; }
  get gender(): Gender { return this._gender; }
  get antecedentes(): Antecedente[] { return this._antecedentes; }
  get motivoConsulta(): string { return this._motivoConsulta; }
  get observaciones(): string { return this._observaciones; }
  get sintomas(): string[] { return this._sintomas; }
  get controls(): Control[] { return this._controls; }
  get patientId(): string { return this._patientId; }
  get nurseId(): string | null { return this._nurseId; }
  get patientName(): string | null { return this._patientName; }
}
