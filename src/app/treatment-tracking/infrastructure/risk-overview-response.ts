export interface RiskLevelSummary {
  count: number;
  description: string;
}

export interface RiskOverviewSummary {
  HIGH: RiskLevelSummary;
  MEDIUM: RiskLevelSummary;
  LOW: RiskLevelSummary;
  total: number;
}

export interface RiskOverviewResponse {
  summary: RiskOverviewSummary;
}
