import { NextRequest, NextResponse } from 'next/server'

import { AnalyticsRepository } from '@/entities/analytics/repository'
import { parseDaysParam } from '@/shared/lib/url'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)

    const days = parseDaysParam(url, 30, 365)

    const data = await AnalyticsRepository.getDailyVisits(days)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Admin daily stats error:', error)
    return NextResponse.json(
      { message: 'Failed to load daily stats' },
      { status: 500 },
    )
  }
}