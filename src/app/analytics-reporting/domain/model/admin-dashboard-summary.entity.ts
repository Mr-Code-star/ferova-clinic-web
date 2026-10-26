export class AdminDashboardSummary {
  constructor(
    public readonly totalActiveFacilities: number,
    public readonly totalCriticalFacilities: number,
    public readonly globalAdherenceRate: number
  ) {}
}
