import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { PrismaMetricsRepository } from '@/shared/api/metrics/prisma.repository'

const repo = new PrismaMetricsRepository()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.sectionId) {
      return new NextResponse('Missing sectionId', { status: 400 })
    }

    //a reliable way to get real data about a visitor
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const ua = req.headers.get('user-agent') || 'unknown'

    await repo.save({
      ...body,
      duration: Number(body.duration) || 0,
      ipAddress: ip,
      userAgent: ua,
    })

    return new NextResponse('OK', { status: 200 })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[API Analytics POST] Database Error:', errorMessage)
    return new NextResponse(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
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