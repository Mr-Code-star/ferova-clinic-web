export interface RiskLevel {
  count: number;
  description: string;
}

export class RiskOverview {
  private _high: RiskLevel;
  private _medium: RiskLevel;
  private _low: RiskLevel;
  private _total: number;

  constructor(data: {
    high: RiskLevel;
    medium: RiskLevel;
    low: RiskLevel;
    total: number;
  }) {
    this._high = data.high;
    this._medium = data.medium;
    this._low = data.low;
    this._total = data.total;
  }

  get high(): RiskLevel { return this._high; }
  get medium(): RiskLevel { return this._medium; }
  get low(): RiskLevel { return this._low; }
  get total(): number { return this._total; }
}
