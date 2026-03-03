import type { DailyPoint, SectionPoint, SummaryStats, VisitData } from '@/entities/analytics'

export class AnalyticsProcessor {
  static filterByRange(data: VisitData[], days: number): VisitData[] {
    if (days === 0) return data

    const msInDay = 24 * 60 * 60 * 1000
    const threshold = Date.now() - days * msInDay

    return data.filter(visit => visit.timestamp >= threshold)
  }

  static calculateSummary(data: VisitData[]): SummaryStats {
    const totalVisits = data.length
    const uniqueVisitors = new Set(data.map(m => m.visitorId)).size
    const totalDuration = data.reduce((acc, m) => acc + m.duration, 0)

    return {
      totalVisits,
      uniqueVisitors,
      avgDuration: totalVisits > 0 ? Math.round(totalDuration / 1000 / totalVisits) : 0,
    }
  }

  static calculateDailyActivity(data: VisitData[]): DailyPoint[] {
    const dailyMap = data.reduce((acc, visit) => {
      const day = new Date(visit.timestamp).toISOString().split('T')[0]
      acc[day] = (acc[day] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(dailyMap)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day))
  }

  static calculateSectionStats(data: VisitData[]): SectionPoint[] {
    const counts = data.reduce((acc, m) => {
      acc[m.sectionId] = (acc[m.sectionId] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(counts).map(([sectionId, count]) => ({
      sectionId,
      count,
    }))
  }

  static sortAndSlice(data: VisitData[], limit: number): VisitData[] {
    return [...data].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit)
  }
}