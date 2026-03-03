'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type PropsWithChildren,
} from 'react'

import { MetricsService } from '@/shared/api/metrics/metrics-service'
import { VisitorManager } from '@/shared/lib/visitor'
import { LocalStorageRepository } from '@/shared/api'
import { IMetricsRepository, NoopMetricsRepository } from '@/shared/api/metrics'

import type { VisitData, AnalyticsDashboard } from '@/entities/analytics'

type AnalyticsContextValue = {
  trackSectionVisit(input: { sectionId: string; duration: number }): Promise<void>
  getDashboard(days: number): Promise<AnalyticsDashboard>
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const repoRef = useRef<IMetricsRepository | null>(null)

  if (repoRef.current === null) {
    const isClient = typeof window !== 'undefined'

    repoRef.current = isClient
      ? new LocalStorageRepository()
      : new NoopMetricsRepository()
  }

  const serviceRef = useRef<MetricsService | null>(null)

  if (serviceRef.current === null) {
    serviceRef.current = new MetricsService(repoRef.current!)
  }

  const lastSentEventRef = useRef<{ id: string; time: number } | null>(null)

  const trackSectionVisit = useCallback(
    async ({ sectionId, duration }: { sectionId: string; duration: number }) => {
      const now = Date.now()

      if (duration < 500) return

      if (typeof window === 'undefined') return

      if (lastSentEventRef.current?.id === sectionId &&
        now - lastSentEventRef.current?.time < 1000) return

      lastSentEventRef.current = { id: sectionId, time: now }
      const visitorId = VisitorManager.getOrCreateId()
      const timestamp = now

      const userAgent = window.navigator.userAgent ?? 'Unknown'
      const country = 'Demo mode'
      const city = 'Local browser'

      const visit: VisitData = {
        sectionId,
        duration,
        timestamp,
        visitorId,
        userAgent,
        country,
        city,
        ipAddress: '0.0.0.0',
      }

      try {
        await repoRef.current!.save(visit)

        console.log(
          '%c[Metrics]%c Section "%s" tracked: %ds',
          'color: #F67769; font-weight: bold',
          'color: inherit',
          visit.sectionId,
          Math.round(visit.duration / 1000),
        )
      } catch (error) {
        console.warn('[AnalyticsProvider] Failed to track visit', error)
      }
    },
    [],
  )

  const getDashboard = useCallback(async (days: 7): Promise<AnalyticsDashboard> => {
    try {
      return await serviceRef.current!.getDashboardData(days)
    } catch (error) {
      console.error('[AnalyticsProvider] Failed to build dashboard', error)
      return {
        summary: { totalVisits: 0, uniqueVisitors: 0, avgDuration: 0 },
        sectionStats: [],
        dailyActivity: [],
        recentVisits: [],
      }
    }
  }, [])

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      trackSectionVisit,
      getDashboard,
    }),
    [trackSectionVisit, getDashboard],
  )

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext)
  if (!ctx) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }
  return ctx
}