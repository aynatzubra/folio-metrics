import { Visit } from '@prisma/client'

import { AnalyticsService } from '@/lib/analytics/service'
import { SummaryStats, VisitData } from '@/lib/analytics/types'

type AnalyticsSummaryResult = {
  summary: SummaryStats
  visits: Visit[]
}

export async function trackVisit(data: VisitData) {
  try {
    await AnalyticsService.trackVisit(data)
  } catch (error) {
    console.error('Visit tracking failed:', error)
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummaryResult> {
  const [summary, visits] = await Promise.all([
    AnalyticsService.getSummary(),
    AnalyticsService.getLastVisits(50),
  ])

  return {
    summary,
    visits,
  }
}