import { prisma } from '@/shared/db/prisma'

import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

// import { createFingerprint } from '@/entities/analytics/lib/fingerprint'

export class PrismaMetricsRepository implements IMetricsRepository {

  async save(data: VisitData): Promise<void> {
    if (!prisma) return

    try {
      const visitor = await prisma.analyticsVisitor.upsert({
        where: {
          fingerprint: data.ipAddress ?? 'unknown',
        },
        update: { lastSeenAt: new Date() },
        create: { fingerprint: data.ipAddress ?? 'unknown' },
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
    } catch (error) {
      console.error('[Prisma Repo] Save error:', error)
    }
  }

  async getAll(): Promise<VisitData[]> {
    if (!prisma) return []

    try {
      const visits = await prisma.visit.findMany({
        orderBy: { createdAt: 'desc' },
        take: 1000,
      })

      return visits.map(v => ({
        sectionId: v.sectionId,
        duration: v.duration ?? 0,
        timestamp: v.createdAt.getTime(),
        visitorId: v.visitorId ?? 'unknown',
        ipAddress: v.ipAddress ?? undefined,
        userAgent: v.userAgent ?? undefined,
        country: v.country ?? undefined,
        city: v.city ?? undefined,
      }))
    } catch (error) {
      console.error('[Prisma Repo] GetAll error:', error)
      return []
    }
  }

  async getLegacyDailyStats(days: number) {
    if (!prisma) return []
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    return prisma.$queryRaw`
      SELECT DATE_TRUNC('day', "createdAt") AS day, COUNT(*) AS count
      FROM "Visit" WHERE "createdAt" >= ${since}
      GROUP BY day ORDER BY day ASC;
    `
  }
}