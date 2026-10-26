export type TreatmentStatusById = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export class TreatmentDetailById {
  private _treatmentId: string;
  private _patientId: string;
  private _patientName: string;
  private _status: TreatmentStatusById;
  private _supplementName: string;
  private _quantity: string;
  private _dosingHours: string;
  private _durationDays: number;
  private _startDate: string;
  private _endDate: string;
  private _adherenceScore: number;
  private _totalConfirmed: number;
  private _totalOmitted: number;
  private _completionObservation: string | null;
  private _abandonmentObservation: string | null;

  constructor(data: {
    treatmentId: string;
    patientId: string;
    patientName: string;
    status: TreatmentStatusById;
    supplementName: string;
    quantity: string;
    dosingHours: string;
    durationDays: number;
    startDate: string;
    endDate: string;
    adherenceScore: number;
    totalConfirmed: number;
    totalOmitted: number;
    completionObservation: string | null;
    abandonmentObservation: string | null;
  }) {
    this._treatmentId = data.treatmentId;
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._status = data.status;
    this._supplementName = data.supplementName;
    this._quantity = data.quantity;
    this._dosingHours = data.dosingHours;
    this._durationDays = data.durationDays;
    this._startDate = data.startDate;
    this._endDate = data.endDate;
    this._adherenceScore = data.adherenceScore;
    this._totalConfirmed = data.totalConfirmed;
    this._totalOmitted = data.totalOmitted;
    this._completionObservation = data.completionObservation;
    this._abandonmentObservation = data.abandonmentObservation;
  }

  get treatmentId(): string { return this._treatmentId; }
  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get status(): TreatmentStatusById { return this._status; }
  get supplementName(): string { return this._supplementName; }
  get quantity(): string { return this._quantity; }
  get dosingHours(): string { return this._dosingHours; }
  get durationDays(): number { return this._durationDays; }
  get startDate(): string { return this._startDate; }
  get endDate(): string { return this._endDate; }
  get adherenceScore(): number { return this._adherenceScore; }
  get totalConfirmed(): number { return this._totalConfirmed; }
  get totalOmitted(): number { return this._totalOmitted; }
  get completionObservation(): string | null { return this._completionObservation; }
  get abandonmentObservation(): string | null { return this._abandonmentObservation; }

  // Helpers
  get isFinished(): boolean {
    return this._completionObservation !== null || this._abandonmentObservation !== null;
  }

  get statusLabel(): string {
    switch (this._status) {
      case 'ACTIVE': return 'Tratamiento en Curso / Activo';
      case 'COMPLETED': return 'Tratamiento Completado';
      case 'ABANDONED': return 'Tratamiento Abandonado';
      default: return this._status;
    }
  }

  get statusBadgeClass(): string {
    switch (this._status) {
      case 'ACTIVE': return 'badge-blue';
      case 'COMPLETED': return 'badge-green';
      case 'ABANDONED': return 'badge-red';
      default: return '';
    }
  }

  // Formatear fechas
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  // Días transcurridos y restantes
  get daysPassed(): number {
    const start = new Date(this._startDate).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    return Math.max(0, Math.round((today - start) / (1000 * 60 * 60 * 24)));
  }

  get daysLeft(): number {
    return Math.max(0, this._durationDays - this.daysPassed);
  }

  get progressPercentage(): number {
    if (this._durationDays === 0) return 0;
    return Math.min(100, (this.daysPassed / this._durationDays) * 100);
  }

  get stageText(): string {
    const pct = this.progressPercentage;
    if (pct < 33) return 'Fase inicial';
    if (pct < 66) return 'Fase de mantenimiento';
    return 'Fase de consolidación';
  }
}
