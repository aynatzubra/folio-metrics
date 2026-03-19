import { NextRequest, NextResponse } from 'next/server'
import { LRUCache } from 'lru-cache'

import { auth } from '@/auth'
import { logError } from '@/shared/lib/error'
import { trackVisitSchema } from '@/entities/analytics'
import { createServerMetricsRepository, MetricsService } from '@/shared/api/metrics'

const repo = createServerMetricsRepository()
const service = new MetricsService(repo)

// --- RATE LIMITER SETUP ---
const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 10 * 1000,
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

    const currentUsage = rateLimit.get(ip) || 0
    if (currentUsage >= 5) {
      logError(`Spam detected from IP: ${ip}`, '[API Analytics POST RateLimit]')
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
    }
    rateLimit.set(ip, currentUsage + 1)
    const body = await req.json()

    const result = trackVisitSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 },
      )
    }

    const userAgent = req.headers.get('user-agent') || 'unknown'
    const country = req.headers.get('x-vercel-ip-country') || undefined
    const city = req.headers.get('x-vercel-ip-city') || undefined

    const visit = {
      ...result.data,
      sectionId: result.data.sectionId,
      duration: result.data.duration,
      timestamp: result.data.timestamp || Date.now(),
      ipAddress: ip,
      userAgent,
      country,
      city,
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