export class Appointment {
  private _appointmentId: string;
  private _patientId: string;
  private _patientName: string;
  private _facilityId: string;
  private _facilityName: string;
  private _appointmentDate: string;
  private _appointmentTime: string;
  private _status: string;

  constructor(data: {
    appointmentId: string;
    patientId: string;
    patientName: string;
    facilityId: string;
    facilityName: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
  }) {
    this._appointmentId = data.appointmentId;
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._facilityId = data.facilityId;
    this._facilityName = data.facilityName;
    this._appointmentDate = data.appointmentDate;
    this._appointmentTime = data.appointmentTime;
    this._status = data.status;
  }

  get appointmentId(): string { return this._appointmentId; }
  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get facilityId(): string { return this._facilityId; }
  get facilityName(): string { return this._facilityName; }
  get appointmentDate(): string { return this._appointmentDate; }
  get appointmentTime(): string { return this._appointmentTime; }
  get status(): string { return this._status; }

  // Helper para obtener las iniciales del paciente (ej. "LU" para Lucia)
  get initials(): string {
    const parts = this._patientName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this._patientName.substring(0, 2).toUpperCase();
  }

  // Helper para formatear la fecha (ej. "Martes 21 Abril")
  get formattedDate(): string {
    if (!this._appointmentDate) return '';

    // Acepta "/" o "-" como separador
    const [day, month, year] = this._appointmentDate.split(/[/-]/);

    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) return this._appointmentDate; // fallback seguro

    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }
}
