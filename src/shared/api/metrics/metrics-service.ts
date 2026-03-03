import { AnalyticsProcessor } from '@/entities/analytics/model'
import mockHistory from '@/shared/assets/data/mock-history.json'

import { IMetricsRepository } from './repository.interface'

import type { AnalyticsDashboard, VisitData } from '@/entities/analytics'

export class MetricsService {
  constructor(private repo: IMetricsRepository) {}

  async getDashboardData(days: number): Promise<AnalyticsDashboard> {
    const rawData = await this.getFullData()

    const filteredData = AnalyticsProcessor.filterByRange(rawData, days)

    return {
      summary: AnalyticsProcessor.calculateSummary(filteredData),
      sectionStats: AnalyticsProcessor.calculateSectionStats(filteredData),
      dailyActivity: AnalyticsProcessor.calculateDailyActivity(filteredData),
      recentVisits: AnalyticsProcessor.sortAndSlice(filteredData, 100),
    }
  }

  private async getFullData(): Promise<VisitData[]> {
    const liveData = await this.repo.getAll()

    if (!mockHistory || mockHistory.length === 0) return liveData

    const newestMockTick = Math.max(...mockHistory.map(m => m.timestamp))

    const offset = Date.now() - newestMockTick

    const dynamicMocks = (mockHistory as VisitData[]).map(visit => ({
      ...visit,
      timestamp: visit.timestamp + offset,
    }))

    return [...dynamicMocks, ...liveData]
  }
}