import { AnalyticsProcessor } from '@/entities/analytics/model'
import { IMetricsRepository } from '@/shared/api/metrics/metrics-repository'
import mockHistory from '@/shared/assets/data/mock-history.json'

import type { AnalyticsDashboard, VisitData } from '@/entities/analytics'

export class MetricsService {
  constructor(private repo: IMetricsRepository) {}

  async getDashboardData(): Promise<AnalyticsDashboard> {
    const data = await this.getFullData()

    return {
      summary: AnalyticsProcessor.calculateSummary(data),
      sectionStats: AnalyticsProcessor.calculateSectionStats(data),
      dailyActivity: AnalyticsProcessor.calculateDailyActivity(data),
      recentVisits: AnalyticsProcessor.sortAndSlice(data, 10),
    }
  }

  private async getFullData(): Promise<VisitData[]> {
    const liveData = await this.repo.getAll()
    return [...(mockHistory as VisitData[]), ...liveData]
  }
}