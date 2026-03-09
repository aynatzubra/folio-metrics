import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { createServerMetricsRepository } from '@/shared/api/metrics/factory'

const repo = createServerMetricsRepository()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body?.sectionId) {
      return NextResponse.json(
        { error: 'Missing sectionId' },
        { status: 400 },
      )
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

    const userAgent = req.headers.get('user-agent') || 'unknown'

    await repo.save({
      ...body,
      duration: Number(body.duration) || 0,
      ipAddress: ip,
      userAgent,
    })

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