'use client'

import { useState, useEffect, useRef } from 'react'

import { AnalyticsDashboard, DailyPoint, SectionPoint, SummaryStats, VisitData } from '@/entities/analytics'
import { logError } from '@/shared/lib/error'
import { RangeOptionValue } from '@/features/admin/analytics-filters'
import { useAnalytics } from '@/shared/api/analytics'

type AnalyticsDashboardSnapshot = {
  range: RangeOptionValue
  data: Pick<AnalyticsDashboard, 'dailyActivity' | 'sectionStats'>
}

const EMPTY_SUMMARY: SummaryStats = {
  totalVisits: 0,
  uniqueVisitors: 0,
  avgDuration: 0,
}

type UseAnalyticsDashboardResult = {
  summary: SummaryStats
  daily: DailyPoint[]
  sections: SectionPoint[]
  recent: VisitData[]
  isLoading: boolean
  error: string | null
}

export function useAnalyticsDashboard(
  range: RangeOptionValue,
  initialState?: AnalyticsDashboardSnapshot,
): UseAnalyticsDashboardResult {
  const { getDashboard } = useAnalytics()

  const initialSnapshotRef = useRef(initialState)
  const skipInitialFetchRef = useRef(
    initialSnapshotRef.current?.range === range,
  )

  const [data, setData] = useState<AnalyticsDashboard | null>(() => {
    const snapshot = initialSnapshotRef.current

    if (!snapshot || snapshot.range !== range) return null

    return {
      summary: EMPTY_SUMMARY,
      dailyActivity: snapshot.data.dailyActivity,
      sectionStats: snapshot.data.sectionStats,
      recentVisits: [],
    }
  })
  const [isLoading, setIsLoading] = useState(!skipInitialFetchRef.current)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (skipInitialFetchRef.current) {
      skipInitialFetchRef.current = false
      return
    }

    const controller = new AbortController()

    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        const stats = await getDashboard(Number(range))
        if (!controller.signal.aborted) {
          setData(stats)
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          logError(e, 'AnalyticsHook')
          setError('Failed to load statistics')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [range, getDashboard])

  return {
    summary: data?.summary ?? EMPTY_SUMMARY,
    daily: data?.dailyActivity || [],
    sections: data?.sectionStats || [],
    recent: data?.recentVisits || [],
    isLoading,
    error,
  }
}