import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { createServerMetricsRepository } from '@/shared/api/metrics/factory'
import { MetricsService } from '@/shared/api/metrics'

const repo = createServerMetricsRepository()
const service = new MetricsService(repo)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body?.sectionId) {
      return NextResponse.json(
        { error: 'Missing sectionId' },
        { status: 400 },
      )
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const visit = {
      sectionId: String(body.sectionId),
      duration: Number(body.duration) || 0,
      timestamp: Number(body.timestamp) || Date.now(),
      visitorId: String(body.visitorId || 'unknown'),
      ipAddress: ip,
      userAgent,
      country: body.country ? String(body.country) : undefined,
      city: body.city ? String(body.city) : undefined,
    }

    await service.trackSectionVisit(visit)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error('[API Analytics POST] Error:', message)

    return NextResponse.json(
      { error: message },
      { status: 500 },
    )
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
    console.error('[API Analytics GET] Error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}