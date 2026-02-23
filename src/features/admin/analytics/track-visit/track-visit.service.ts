import { AnalyticsRepository } from '@/entities/analytics/repository'

import type { VisitData } from '@/entities/analytics'

export async function trackVisitService(data: VisitData) {
  try {
    await AnalyticsRepository.trackVisit(data)
  } catch (error) {
    console.error('Visit tracking failed:', error)
  }
}