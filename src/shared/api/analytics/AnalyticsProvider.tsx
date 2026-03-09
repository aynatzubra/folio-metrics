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
import { LocalStorageMetricsRepository } from '@/shared/api'
import { HttpMetricsRepository, NoopMetricsRepository } from '@/shared/api/metrics'
import { IMetricsRepository } from '@/shared/api/metrics/repository.interface'
import { createClientMetricsRepository } from '@/shared/api/metrics/factory'

import type { VisitData, AnalyticsDashboard } from '@/entities/analytics'

const INITIAL_DASHBOARD_DATA: AnalyticsDashboard = {
  summary: { totalVisits: 0, uniqueVisitors: 0, avgDuration: 0 },
  sectionStats: [],
  dailyActivity: [],
  recentVisits: [],
}

type AnalyticsContextValue = {
  trackSectionVisit(input: { sectionId: string; duration: number }): Promise<void>
  getDashboard(days: number): Promise<AnalyticsDashboard>
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const mode = process.env.NEXT_PUBLIC_ANALYTICS_MODE || 'demo'

  const repoRef = useRef<IMetricsRepository | null>(null)
  const serviceRef = useRef<MetricsService | null>(null)

  if (!repoRef.current) {
    repoRef.current = createClientMetricsRepository()
  }

  if (!serviceRef.current) {
    serviceRef.current = new MetricsService(repoRef.current)
  }

  const lastSentEventRef = useRef<{ id: string; time: number } | null>(null)

  const trackSectionVisit = useCallback(
    async ({ sectionId, duration }: { sectionId: string; duration: number }) => {
      const now = Date.now()
      if (duration < 500 || typeof window === 'undefined' || !repoRef.current) return

      //prevent race condition
      if (lastSentEventRef.current?.id === sectionId && now - lastSentEventRef.current?.time < 1000) return
      lastSentEventRef.current = { id: sectionId, time: now }

      const visit: VisitData = {
        sectionId,
        duration: Math.round(duration),
        timestamp: now,
        visitorId: VisitorManager.getOrCreateId(),
        userAgent: window.navigator.userAgent,
        country: mode === 'prod' ? undefined : 'Demo Local',
        city: mode === 'prod' ? undefined : 'Local Browser',
        ipAddress: '0.0.0.0',
      }

      try {
        await repoRef.current.save(visit)
      } catch (error) {
        console.error('[Analytics] Save failed:', error)
      }
    },
    [mode],
  )

  const getDashboard = useCallback(async (days: number): Promise<AnalyticsDashboard> => {
    if (!serviceRef.current) {
      console.error('[Analytics] Dashboard requested before initialization')
      return INITIAL_DASHBOARD_DATA
    }
    try {
      return await serviceRef.current.getDashboardData(days)
    } catch (error) {
      console.error('[AnalyticsProvider] Unexpected error during data fetch:', error)
      return INITIAL_DASHBOARD_DATA //default
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