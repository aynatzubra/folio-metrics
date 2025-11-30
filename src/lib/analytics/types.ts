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