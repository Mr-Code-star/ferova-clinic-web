export type TreatmentStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export class NurseTreatment {
  private _treatmentId: string;
  private _patientId: string;
  private _patientName: string;
  private _status: TreatmentStatus;
  private _supplementName: string;

  constructor(data: {
    treatmentId: string;
    patientId: string;
    patientName: string;
    status: TreatmentStatus;
    supplementName: string;
  }) {
    this._treatmentId = data.treatmentId;
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._status = data.status;
    this._supplementName = data.supplementName;
  }

  get treatmentId(): string { return this._treatmentId; }
  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get status(): TreatmentStatus { return this._status; }
  get supplementName(): string { return this._supplementName; }

  get initials(): string {
    const parts = this._patientName.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return this._patientName.substring(0, 2).toUpperCase();
  }

  get statusLabel(): string {
    switch (this._status) {
      case 'ACTIVE': return 'ACTIVO';
      case 'COMPLETED': return 'COMPLETADO';
      case 'ABANDONED': return 'ABANDONADO';
      default: return this._status;
    }
  }

  get statusClass(): string {
    switch (this._status) {
      case 'ACTIVE': return 'badge-active';
      case 'COMPLETED': return 'badge-completed';
      case 'ABANDONED': return 'badge-abandoned';
      default: return '';
    }
  }
}
