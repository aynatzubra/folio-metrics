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

export interface DailyPoint {
  day: string
  count: number
}

export interface SectionPoint {
  sectionId: string
  count: number
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

async function getDailyVisitsInternal(days = 7): Promise<DailyPoint[]> {
  const since = new Date(Date.now() - days * DAY_MS)

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
  })

  const buckets = new Map<string, number>

  for (const visit of visits) {
    const day = visit.createdAt.toISOString().slice(0, 10)
    buckets.set(day, (buckets.get(day) ?? 0) + 1)
  }

  return Array.from(buckets.entries())
    .map(([day, count]) => ({ day, count }))
    .sort((a, b) => a.day.localeCompare(b.day))
}

async function getTopSectionsInternal(days = 7): Promise<SectionPoint[]> {
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

  async getDailyVisits(days = 7, ttlMs = 60000): Promise<DailyPoint[]> {
    return withCache(`daily:${days}`, ttlMs, () => getDailyVisitsInternal())
  },

  async getTopSections(days = 7, ttlM = 60_000): Promise<SectionPoint[]> {
    return withCache(`sections:${days}`, ttlM, () => getTopSectionsInternal())
  },
}