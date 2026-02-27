import { prisma } from '@/shared/db/prisma'
import { createFingerprint } from '@/entities/analytics/lib/fingerprint'

import type { DailyPoint, SectionPoint, SummaryStats, VisitData } from '@/entities/analytics/index'

type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const EMPTY_SUMMARY: SummaryStats = {
  totalVisits: 0,
  uniqueVisitors: 0,
  avgDuration: 0,
}

type AnalyticsCacheValue = SummaryStats | DailyPoint[] | SectionPoint[]

const cache = new Map<string, CacheEntry<AnalyticsCacheValue>>()

const DAY_MS = 24 * 60 * 60 * 1000

async function withCache<T extends AnalyticsCacheValue>(
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
  if (!prisma) return

  const fingerprint = createFingerprint(
    data.ipAddress ?? 'unknown',
    data.userAgent ?? 'unknown',
  )

  const visitor = await prisma.analyticsVisitor.upsert({
    where: { fingerprint },
    update: { lastSeenAt: new Date() },
    create: { fingerprint },
  })

  await prisma.visit.create({
    data: {
      sectionId: data.sectionId,
      visitorId: visitor.id,
      country: data.country,
      city: data.city,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      duration: data.duration,
    },
  })
}

async function getSummaryInternal(): Promise<SummaryStats> {
  if (!prisma) return EMPTY_SUMMARY

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
  if (!prisma) return []

  return prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

async function getDailyVisitsInternal(days = 7): Promise<DailyPoint[]> {
  if (!prisma) return []

  const since = new Date(Date.now() - days * DAY_MS)

  const stats = await prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`
    SELECT
      DATE_TRUNC('day', "createdAt") AS day,
      CAST(COUNT(*) AS INTEGER) AS count
    FROM "Visit"
    WHERE "createdAt" >= ${since}
    GROUP BY day
    ORDER BY day ASC;
  `

  return stats.map(row => ({
    day: row.day.toISOString().slice(0, 10),
    count: Number(row.count),
  }))
}

async function getTopSectionsInternal(days = 7): Promise<SectionPoint[]> {
  if (!prisma) return []

  const since = new Date(Date.now() - days * DAY_MS)

  const grouped = await prisma.visit.groupBy({
    by: ['sectionId'],
    where: { createdAt: { gte: since } },
    _count: { sectionId: true },
    orderBy: { _count: { sectionId: 'desc' } },
    take: 10,
  })

  return grouped.map((g) => ({
    sectionId: g.sectionId,
    count: g._count.sectionId,
  }))
}

export const AnalyticsRepository = {

  async trackVisit(data: VisitData) {
    return trackVisitInternal(data)
  },

  async getSummary(ttlMs = 60_000): Promise<SummaryStats> {
    return withCache('summary', ttlMs, getSummaryInternal)
  },

  async getLastVisits(limit = 50) {
    return getLastVisitsInternal(limit)
  },

  async getDailyVisits(days = 7, ttlMs = 60_000): Promise<DailyPoint[]> {
    return withCache(`daily:${days}`, ttlMs, () => getDailyVisitsInternal(days))
  },

  async getTopSections(days = 7, ttlMs = 60_000): Promise<SectionPoint[]> {
    return withCache(`sections:${days}`, ttlMs, () => getTopSectionsInternal(days))
  },
}