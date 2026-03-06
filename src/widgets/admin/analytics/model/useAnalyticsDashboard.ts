'use client'

import { useState, useEffect } from 'react'

import { RangeOptionValue } from '@/widgets/admin/analytics'
import { AnalyticsDashboard } from '@/entities/analytics'
import { useAnalytics } from '@/shared/api'
import { logError } from '@/shared/lib/error'

export function useAnalyticsDashboard(range: RangeOptionValue) {
  const { getDashboard } = useAnalytics()
  const [data, setData] = useState<AnalyticsDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
    summary: data?.summary ?? { totalVisits: 0, uniqueVisitors: 0, avgDuration: 0 },
    daily: data?.dailyActivity || [],
    sections: data?.sectionStats || [],
    recent: data?.recentVisits || [],
    isLoading,
    error,
  }
}