export interface VisitData {
  sectionId: string
  duration: number
  timestamp: number
  visitorId: string
  ipAddress?: string
  userAgent?: string
  country?: string
  city?: string
  isMock?: boolean
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

export interface AnalyticsDashboard {
  summary: SummaryStats
  sectionStats: SectionPoint[]
  dailyActivity: DailyPoint[]
  recentVisits: VisitData[]
}