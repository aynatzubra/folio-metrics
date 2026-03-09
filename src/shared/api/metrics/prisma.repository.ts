import { prisma } from '@/shared/db/prisma'

import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

export class PrismaMetricsRepository implements IMetricsRepository {

  async save(data: VisitData): Promise<void> {
    if (!prisma) {
      console.error('[Prisma Repo] Cannot save: Prisma is disabled or null')
      return
    }

    const visitor = await prisma.analyticsVisitor.upsert({
      where: { fingerprint: data.ipAddress ?? 'unknown' }, //todo: technical debt
      update: { lastSeenAt: new Date() },
      create: { fingerprint: data.ipAddress ?? 'unknown' },
    })

    await prisma.visit.create({
      data: {
        sectionId: data.sectionId,
        duration: data.duration,
        visitorId: visitor.id,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        country: data.country,
        city: data.city,
      },
    })
  }

  async getAll(): Promise<VisitData[]> {
    if (!prisma) {
      // console.error('[Prisma Repo] Cannot getAll: Prisma is disabled or null')
      return []
    }

    try {
      const visits = await prisma.visit.findMany({
        orderBy: { createdAt: 'desc' },
        take: 1000,
      })

      return visits.map(v => ({
        visitorId: v.visitorId ?? 'unknown',
        sectionId: v.sectionId,
        duration: v.duration ?? 0,
        timestamp: v.createdAt.getTime(),
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
}