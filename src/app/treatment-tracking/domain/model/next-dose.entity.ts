export class NextDose {
  constructor(
    public readonly hasNextDose: boolean,
    public readonly dayLabel: string | null,
    public readonly dosageHours: string | null,
    public readonly scheduledDate: string | null,
    public readonly daysFromToday: number | null,
    public readonly message: string | null,
  ) {}

  get displayLabel(): string {
    if (!this.hasNextDose) return this.message ?? 'Sin dosis programadas';
    return `${this.dayLabel}, ${this.dosageHours}`;
  }
}
