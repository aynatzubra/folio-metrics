import { prisma } from '@/lib/db'

export interface VisitData {
  sectionId: string
  duration: number
  ipAddress: string
  userAgent: string
  country: string
  city: string
}

export interface SummaryStats {
  totalVisits: number
  uniqueVisitors: number
  avgDuration: number
}

type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const cache = new Map<string, CacheEntry<unknown>>()
const DAY_MS = 24 * 60 * 60 * 1000

async function withCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  const now = Date.now()
  const entry = cache.get(key) as CacheEntry<T> | undefined

  if (entry && entry.expiresAt > now) {
    return entry.value
  }

  const value = await loader()
  cache.set(key, { value, expiresAt: now + ttlMs })
  return value
}

async function trackVisitInternal(data: VisitData) {
  await prisma.visit.create({
    data: {
      sectionId: data.sectionId,
      country: data.country,
      city: data.city,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      duration: data.duration,
    },
  })
}

async function getSummaryInternal(): Promise<SummaryStats> {
  const [totalVisits, uniqueVisitorsByIp, avgDurationResult] = await Promise.all([
    prisma.visit.count(),
    prisma.visit.groupBy({ by: ['ipAddress'] }),
    prisma.visit.aggregate({ _avg: { duration: true } }),
  ])

  return {
    totalVisits,
    uniqueVisitors: uniqueVisitorsByIp.length,
    avgDuration: Math.round(avgDurationResult._avg.duration || 0),
  }
}

async function getLastVisitsInternal(limit = 50) {
  return prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export const AnalyticsService = {

  async trackVisit(data: VisitData) {
    return trackVisitInternal(data)
  },

  async getSummary(ttlMs = 60000): Promise<SummaryStats> {
    return withCache('summary', ttlMs, getSummaryInternal)
  },

  async getLastVisits(limit = 50) {
    return getLastVisitsInternal(limit)
  },


}

