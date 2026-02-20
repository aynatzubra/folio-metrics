import { Visit } from '@prisma/client'

import { AnalyticsService } from '@/entities/analytics'

import type { SummaryStats } from '@/entities/analytics'

type AnalyticsSummaryResult = {
  summary: SummaryStats
  visits: Visit[]
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