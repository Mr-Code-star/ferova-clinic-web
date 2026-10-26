export class PendingPatient {
  private _patientId: string;
  private _patientName: string;

  constructor(data: { patientId: string; patientName: string }) {
    this._patientId = data.patientId;
    this._patientName = data.patientName;
  }

  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }

  get initials(): string {
    const parts = this._patientName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this._patientName.substring(0, 2).toUpperCase();
  }
}
