import { AnalyticsService } from '@/entities/analytics/api/service'

import type { VisitData } from '@/entities/analytics'

export async function trackVisit(data: VisitData) {
  try {
    await AnalyticsService.trackVisit(data)
  } catch (error) {
    console.error('Visit tracking failed:', error)
  }
}