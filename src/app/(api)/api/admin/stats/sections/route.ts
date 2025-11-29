import { NextRequest, NextResponse } from 'next/server'

import { AnalyticsService } from '@/lib/analytics/service'
import { parseDaysParam } from '@/app/(api)/api/admin/stats/utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)

    const days = parseDaysParam(url, 30, 365)

    const data = await AnalyticsService.getTopSections(days)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Admin section stats error:', error)
    return NextResponse.json(
      { message: 'Failed to load section stats' },
      { status: 500 },
    )
  }
}