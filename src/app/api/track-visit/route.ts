import { NextRequest } from 'next/server'

import { trackVisit } from '@/features/analytics/track-visit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const preferredRegion = 'auto'

function randomFallback(type: 'city' | 'country'): string {
  const cityFallbacks = [
    'Hmm, where are you?',
    'City of mystery',
    'Hidden location',
    'No map can find it',
    'Ghost town',
  ]

  const countryFallbacks = [
    'Somewhere on Earth',
    'From a secret place',
    'Planet Internet',
    'Beyond the map',
    'Lost coordinates',
  ]

  const pool = type === 'city' ? cityFallbacks : countryFallbacks
  return pool[Math.floor(Math.random() * pool.length)]
}

async function parseBody(req: NextRequest): Promise<{ sectionId?: string; duration?: number }> {
  const ct = req.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    return await req.json()
  }
  const raw = await req.text()
  try {
    return JSON.parse(raw)
  } catch {
    const params = new URLSearchParams(raw)
    return {
      sectionId: params.get('sectionId') || undefined,
      duration: params.get('duration') ? Number(params.get('duration')) : undefined,
    }
  }
}

function getGeo(req: NextRequest) {
  const h = req.headers
  const country = h.get('x-vercel-ip-country') || randomFallback('country')
  const city = h.get('x-vercel-ip-city') || randomFallback('city')
  return { country, city }
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.ip || ''
}

export async function POST(req: NextRequest) {
  try {
    // receive the data sent by useSectionObserver via sendBeacon
    const { sectionId, duration } = await parseBody(req)

    if (!sectionId) {
      return new Response('`sectionId` is required', { status: 400 })
    }

    // receive server data
    const { country, city } = getGeo(req)
    const ip = getClientIp(req) || '0.0.0.0'
    const userAgent = req.headers.get('user-agent') || 'Unknown'

    // call tracking function with the full data set
    await trackVisit({
      sectionId,
      duration: Number.isFinite(duration as number) ? (duration as number) : 0,
      ipAddress: ip,
      userAgent,
      country,
      city,
    })

    // successful response
    return new Response('Tracked', {
      status: 200,
    })
  } catch (error) {
    console.error('API Track Error:', error)
    return new Response('Error processing request', { status: 400 })
  }
}