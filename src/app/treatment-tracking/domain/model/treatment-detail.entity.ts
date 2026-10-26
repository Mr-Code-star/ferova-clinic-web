export class TreatmentDetail {
  private _patientId: string;
  private _patientName: string;
  private _patientYearOld: number;
  private _motherName: string;
  private _score: number;
  private _riskLevel: string;
  private _adherenceScore: number;
  private _totalConfirmed: number;
  private _totalOmitted: number;
  private _supplementName: string;
  private _quantity: string;
  private _dosageHours: string;
  private _startDate: string;
  private _endDate: string;
  private _durationDays: number;

  constructor(data: {
    patientId: string;
    patientName: string;
    patientYearOld: number;
    motherName: string;
    score: number;
    riskLevel: string;
    adherenceScore: number;
    totalConfirmed: number;
    totalOmitted: number;
    supplementName: string;
    quantity: string;
    dosageHours: string;
    startDate: string;
    endDate: string;
    durationDays: number;
  }) {
    this._patientId = data.patientId;
    this._patientName = data.patientName;
    this._patientYearOld = data.patientYearOld;
    this._motherName = data.motherName;
    this._score = data.score;
    this._riskLevel = data.riskLevel;
    this._adherenceScore = data.adherenceScore;
    this._totalConfirmed = data.totalConfirmed;
    this._totalOmitted = data.totalOmitted;
    this._supplementName = data.supplementName;
    this._quantity = data.quantity;
    this._dosageHours = data.dosageHours;
    this._startDate = data.startDate;
    this._endDate = data.endDate;
    this._durationDays = data.durationDays;
  }

  get patientId(): string { return this._patientId; }
  get patientName(): string { return this._patientName; }
  get patientYearOld(): number { return this._patientYearOld; }
  get motherName(): string { return this._motherName; }
  get score(): number { return this._score; }
  get riskLevel(): string { return this._riskLevel; }
  get adherenceScore(): number { return this._adherenceScore; }
  get totalConfirmed(): number { return this._totalConfirmed; }
  get totalOmitted(): number { return this._totalOmitted; }
  get supplementName(): string { return this._supplementName; }
  get quantity(): string { return this._quantity; }
  get dosageHours(): string { return this._dosageHours; }
  get startDate(): string { return this._startDate; }
  get endDate(): string { return this._endDate; }
  get durationDays(): number { return this._durationDays; }

  // Helpers
  get riskBadgeClass(): string {
    if (this._riskLevel === 'HIGH') return 'badge-high';
    if (this._riskLevel === 'MEDIUM') return 'badge-medium';
    return 'badge-low';
  }

  get riskText(): string {
    if (this._riskLevel === 'HIGH') return 'RIESGO ALTO';
    if (this._riskLevel === 'MEDIUM') return 'RIESGO MEDIO';
    return 'RIESGO BAJO';
  }

  // Formatear fecha "2026-10-27T23:17:17.758Z" -> "27 de Octubre 2026"
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Calcular días transcurridos y faltantes
  private getMidnight(dateString: string): number {
    if (!dateString) return 0;
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }


  get totalDays(): number {
    return this._durationDays;
  }

  get daysPassed(): number {
    const start = this.getMidnight(this._startDate);
    const today = this.getMidnight(new Date().toISOString());
    const diffMs = today - start;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  get daysLeft(): number {
    return Math.max(0, this._durationDays - this.daysPassed);
  }

  get progressPercentage(): number {
    if (this._durationDays === 0) return 0;
    const percentage = (this.daysPassed / this._durationDays) * 100;
    return Math.min(100, percentage);
  }
}
