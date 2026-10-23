import { RiskOverviewResponse } from './risk-overview-response';
import { RiskOverview } from '../domain/model/risk-overview.entity';

export class RiskOverviewAssembler {
  toEntityFromResponse(response: RiskOverviewResponse): RiskOverview {
    return new RiskOverview({
      high: {
        count: response.summary.HIGH.count,
        description: response.summary.HIGH.description
      },
      medium: {
        count: response.summary.MEDIUM.count,
        description: response.summary.MEDIUM.description
      },
      low: {
        count: response.summary.LOW.count,
        description: response.summary.LOW.description
      },
      total: response.summary.total
    });
  }
}
