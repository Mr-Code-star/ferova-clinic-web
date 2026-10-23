export type DoseDayStatus = 'CONFIRMED' | 'OMITTED' | 'PENDING' | 'NO_DOSE';

export class WeeklyAdherenceDay {
  constructor(
    public readonly date: string,
    public readonly dayLabel: string,
    public readonly status: DoseDayStatus,
    public readonly heightPercentage: number,
  ) {}

  get cssClass(): string {
    switch (this.status) {
      case 'CONFIRMED': return 'confirmed';
      case 'OMITTED':   return 'omitted';
      case 'PENDING':   return 'pending';
      default:          return 'no-dose';
    }
  }
}

export class WeeklyAdherence {
  constructor(
    public readonly patientId: string,
    public readonly treatmentId: string,
    public readonly days: WeeklyAdherenceDay[],
  ) {}
}
