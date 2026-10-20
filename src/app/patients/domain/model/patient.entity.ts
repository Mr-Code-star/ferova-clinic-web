import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type AssignmentStatus = 'ASSIGNED' | 'UNASSIGNED';
export type Gender = 'MALE' | 'FEMALE';

export class Patient implements BaseEntity {
  private _patientId: string | null;
  private _patientName: string;
  private _patientLastName: string;
  private _gender: Gender;
  private _status: string;
  private _assigmentStatus: AssignmentStatus;

  constructor(patient: {
    patientId: string | null;
    patientName: string;
    patientLastName: string;
    gender: Gender;
    status: string;
    assigmentStatus: AssignmentStatus;
  }) {
    this._patientId = patient.patientId;
    this._patientName = patient.patientName;
    this._patientLastName = patient.patientLastName;
    this._gender = patient.gender;
    this._status = patient.status;
    this._assigmentStatus = patient.assigmentStatus;
  }

  // ===== patientId =====
  get id(): string | null {
    return this._patientId;
  }

  get patientId(): string | null {
    return this._patientId;
  }

  set patientId(value: string | null) {
    this._patientId = value;
  }

  // ===== patientName =====
  get patientName(): string {
    return this._patientName;
  }

  set patientName(value: string) {
    this._patientName = value;
  }

  // ===== patientLastName =====
  get patientLastName(): string {
    return this._patientLastName;
  }

  set patientLastName(value: string) {
    this._patientLastName = value;
  }

  // ===== gender =====
  get gender(): Gender {
    return this._gender;
  }

  set gender(value: Gender) {
    this._gender = value;
  }

  // ===== status =====
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  // ===== assigmentStatus =====
  get assigmentStatus(): AssignmentStatus {
    return this._assigmentStatus;
  }

  set assigmentStatus(value: AssignmentStatus) {
    this._assigmentStatus = value;
  }
}
