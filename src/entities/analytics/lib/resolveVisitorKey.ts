import { VisitData } from '@/entities/analytics'

import { createVisitorHash } from './createVisitorHash'

export function resolveVisitorKey(data: VisitData): string {
  if (data.visitorId) {
    return data.visitorId
  }

  if (data.ipAddress || data.userAgent) {
    return createVisitorHash(data.ipAddress ?? '', data.userAgent ?? '')
  }

  /**
   * Fallback identity for completely anonymous traffic.
   *
   * Situation::
   * Multiple unrelated users may collapse into the same visitor
   * when neither visitorId, IP nor User-Agent are available.
   *
   * This is intentional in demo / low-scale environments to avoid
   * polluting the AnalyticsVisitor table with low-quality identities.
   *
   * In high-scale production systems, a solution may be possible using
   * random session IDs or visit-only records.
   */
  return 'anonymous'
}