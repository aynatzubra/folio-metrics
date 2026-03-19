import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { logError } from '@/shared/lib/error'
import { trackVisitSchema } from '@/entities/analytics'
import { createServerMetricsRepository, MetricsService } from '@/shared/api/metrics'

const repo = createServerMetricsRepository()
const service = new MetricsService(repo)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = trackVisitSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 },
      )
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const visit = {
      ...result.data,
      sectionId: result.data.sectionId,
      duration: result.data.duration,
      timestamp: result.data.timestamp || Date.now(),
      ipAddress: ip,
      userAgent,
    }

    await service.trackSectionVisit(visit)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {

    logError(error, '[API Analytics POST]')

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const data = await repo.getAll()
    return NextResponse.json(data)
  } catch (error) {
    logError(error, '[API Analytics GET]')

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}