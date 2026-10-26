export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export class FacilityStatus {
  constructor(
    public readonly facilityId: string,
    public readonly facilityName: string,
    public readonly districtName: string,
    public readonly adherenceRate: number,
    public readonly riskLevel: RiskLevel,
    public readonly totalPatients: number,
    public readonly totalConfirmed: number,
    public readonly totalOmitted: number
  ) {}

  // Helper para el color del punto (rojo, amarillo, verde)
  get riskColor(): string {
    switch (this.riskLevel) {
      case 'HIGH': return '#ef4444';   // rojo
      case 'MEDIUM': return '#f59e0b'; // amarillo
      case 'LOW': return '#10b981';    // verde
      default: return '#cbd5e1';
    }
  }
}
