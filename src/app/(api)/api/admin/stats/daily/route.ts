import { NextRequest, NextResponse } from 'next/server'

import { AnalyticsService } from '@/lib/analytics/service'
import { parseDaysParam } from '@/app/(api)/api/admin/stats/utils'

export async function GET(reg: NextRequest) {
  try {
    const url = new URL(reg.url)

    const days = parseDaysParam(url, 30, 365)

    const data = await AnalyticsService.getDailyVisits(days)

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.log('Admin daily stats error:', error)
    return NextResponse.json(
      { message: 'Failed to load daily stats' },
      { status: 500 },
    )
  }
}