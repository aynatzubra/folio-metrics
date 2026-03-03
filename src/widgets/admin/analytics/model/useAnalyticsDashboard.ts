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
  const [uiError, setUiError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDemoStats() {
      setIsLoading(true)
      setUiError(null)

      try {
        const stats = await getDashboard(Number(range))

        setData(stats)
      } catch (e) {
        logError(e, 'AnalyticsHook')
        setUiError('Failed to load statistics')
      } finally {
        setIsLoading(false)
      }
    }

    loadDemoStats()
  }, [range, getDashboard])

  return {
    summary: data?.summary || null,
    daily: data?.dailyActivity || null,
    sections: data?.sectionStats || null,
    recent: data?.recentVisits || [],
    isLoading,
    error: uiError,
  }
}