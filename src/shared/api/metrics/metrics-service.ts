import { AnalyticsProcessor } from '@/entities/analytics/model'
import mockHistory from '@/shared/assets/data/mock-history.json'
import { IS_DEMO_MODE } from '@/shared/lib/utils'

import { IMetricsRepository } from './repository.interface'

import type { AnalyticsDashboard, VisitData } from '@/entities/analytics'

type VisitWithSource = VisitData & { isMock: boolean }

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

  private async getFullData(): Promise<VisitWithSource[]> {
    const liveData = await this.repo.getAll()

    const processedData: VisitWithSource[] = liveData.map(visit => ({
      ...visit,
      isMock: false,
    }))

    if (processedData.length > 0) {
      return processedData
    }

    if (!mockHistory || mockHistory.length === 0) {
      return processedData
    }

    const newestMockTick = Math.max(...mockHistory.map(m => m.timestamp))
    const offset = Date.now() - newestMockTick

    const shiftedMocks: VisitWithSource[] = (mockHistory as VisitData[]).map(visit => ({
      ...visit,
      timestamp: visit.timestamp + offset,
      isMock: true,
    }))

    if (!IS_DEMO_MODE && processedData.length === 0) {
      console.log('[MetricsService] DB is empty, showing shifted mocks for demo purposes')
    }

    return [...shiftedMocks, ...processedData]
  }
}