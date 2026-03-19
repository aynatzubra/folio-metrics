import mockHistory from '@/shared/assets/data/mock-history.json'
import { IS_DEMO_MODE } from '@/shared/lib/utils'
import { invalidateCache, withCache } from '@/shared/lib/cache'
import { AnalyticsDashboard, AnalyticsProcessor, VisitData } from '@/entities/analytics'
import { IMetricsRepository, PrismaMetricsRepository } from '@/shared/api/metrics'

type VisitWithSource = VisitData & { isMock: boolean }

const DASHBOARD_CACHE_PREFIX = 'dashboard:'
const CACHE_TTL = 5 * 60 * 1000 // 5 min

let hasLoggedMockFallback = false

export class MetricsService {
  constructor(private repo: IMetricsRepository) {}

  async getDashboardData(days: number): Promise<AnalyticsDashboard> {
    const cacheKey = `${DASHBOARD_CACHE_PREFIX}${days}`

    return withCache(cacheKey, CACHE_TTL, async () => {
      const rawData = await this.getFullData()
      const filteredData = AnalyticsProcessor.filterByRange(rawData, days)

      return {
        summary: AnalyticsProcessor.calculateSummary(filteredData),
        sectionStats: AnalyticsProcessor.calculateSectionStats(filteredData),
        dailyActivity: AnalyticsProcessor.calculateDailyActivity(filteredData),
        recentVisits: AnalyticsProcessor.sortAndSlice(filteredData, 100),
      }
    })
  }

  async trackSectionVisit(visit: VisitData): Promise<void> {
    await this.repo.save(visit)
    invalidateCache(DASHBOARD_CACHE_PREFIX)

    if (this.repo instanceof PrismaMetricsRepository) {
      await this.repo.cleanupOldVisits(100)
    }
  }

  private async getFullData(): Promise<VisitWithSource[]> {
    const liveData = await this.repo.getAll()

    const processedData: VisitWithSource[] = liveData.map(visit => ({
      ...visit,
      isMock: false,
    }))

    if (processedData.length > 0 || !mockHistory?.length) return processedData

    const newestMockTick = Math.max(...mockHistory.map(m => m.timestamp))
    const offset = Date.now() - newestMockTick

    const shiftedMocks: VisitWithSource[] = (mockHistory as VisitData[]).map(visit => ({
      ...visit,
      timestamp: visit.timestamp + offset,
      isMock: true,
    }))

    if (!IS_DEMO_MODE && processedData.length === 0 && !hasLoggedMockFallback) {
      console.info('[MetricsService] DB is empty, showing shifted mocks for demo purposes')
      hasLoggedMockFallback = true
    }

    return [...shiftedMocks, ...processedData]
  }
}