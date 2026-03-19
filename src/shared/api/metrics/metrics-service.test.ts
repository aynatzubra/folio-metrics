import { invalidateCache, withCache } from '@/shared/lib/cache'
import { VisitData } from '@/entities/analytics'

import { MetricsService } from './metrics-service'
import { IMetricsRepository } from './repository.interface'

jest.mock('@/shared/lib/cache', () => ({
  invalidateCache: jest.fn(),
  withCache: jest.fn(async (key, ttl, cb) => await cb()),
}))

jest.mock('@/shared/assets/data/mock-history.json', () => [
  { sectionId: 'mock-section', duration: 100, timestamp: 1000, visitorId: 'mock-1' },
])

describe('MetricsService', () => {
  let service: MetricsService
  let mockRepo: jest.Mocked<IMetricsRepository>

  beforeEach(() => {
    jest.clearAllMocks()

    mockRepo = {
      save: jest.fn(),
      getAll: jest.fn(),
    }

    service = new MetricsService(mockRepo)
  })

  it('should save visit and invalidate cache', async () => {
    const dummyVisit: VisitData = {
      sectionId: 'hero',
      duration: 5000,
      timestamp: Date.now(),
      visitorId: 'v-123',
    }

    await service.trackSectionVisit(dummyVisit)

    expect(mockRepo.save).toHaveBeenCalledWith(dummyVisit)
    expect(mockRepo.save).toHaveBeenCalledTimes(1)

    expect(invalidateCache).toHaveBeenCalledWith('dashboard:')
  })

  it('should return live data and ignore mocks when DB is NOT empty', async () => {
    const liveData: VisitData[] = [{
      sectionId: 'projects',
      duration: 12000,
      timestamp: Date.now(),
      visitorId: 'v-456',
    }]
    mockRepo.getAll.mockResolvedValue(liveData)

    const dashboard = await service.getDashboardData(30)

    expect(mockRepo.getAll).toHaveBeenCalledTimes(1)

    expect(dashboard.recentVisits).toHaveLength(1)
    expect(dashboard.recentVisits[0].sectionId).toBe('projects')
    expect((dashboard.recentVisits[0] as any).isMock).toBe(false)
  })

  it('should fallback to shifted mocks when DB is empty', async () => {
    mockRepo.getAll.mockResolvedValue([])

    const dashboard = await service.getDashboardData(30)

    expect(mockRepo.getAll).toHaveBeenCalledTimes(1)

    expect(dashboard.recentVisits).toHaveLength(1)
    expect(dashboard.recentVisits[0].sectionId).toBe('mock-section')

    expect((dashboard.recentVisits[0] as any).isMock).toBe(true)
  })
})