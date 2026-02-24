import { useState, useEffect, useTransition } from 'react'

import { fetchJson } from '@/shared/api/fetchJson'
import { RangeOptionValue } from '@/widgets/admin/analytics'
import { DailyPoint, SectionPoint } from '@/entities/analytics'
import { logError, toErrorMessage } from '@/shared/lib/error'
import { HttpError } from '@/shared/api'

function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  )
}

type InitialAnalytics = {
  initialRange: RangeOptionValue
  initialDaily: DailyPoint[] | null
  initialSections: SectionPoint[] | null
}

export function useAnalytics(range: RangeOptionValue, initial?: InitialAnalytics) {
  const isInitialDataValid =
    initial &&
    range === initial.initialRange &&
    initial.initialDaily !== null

  //services and client see the same thing
  const [data, setData] = useState<{
    daily: DailyPoint[] | null
    sections: SectionPoint[] | null
  }>(() => ({
    daily: isInitialDataValid ? initial.initialDaily : null,
    sections: isInitialDataValid ? initial.initialSections : null,
  }))

  const [isLoading, setIsLoading] = useState(!isInitialDataValid)
  const [uiError, setUiError] = useState<string | null>(null)
  const [fatalError, setFatalError] = useState<Error | null>(null)

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (range === initial?.initialRange && data.daily !== null) return

    //bridge
    if (fatalError) throw fatalError

    const controller = new AbortController()

    startTransition(async () => {
      setIsLoading(true)
      setUiError(null)

      try {
        const [dailyRes, sectionsRes] = await Promise.all([
          fetchJson<DailyPoint[]>(`/api/admin/stats/daily?days=${range}`, { signal: controller.signal }),
          fetchJson<SectionPoint[]>(`/api/admin/stats/sections?days=${range}`, { signal: controller.signal }),
        ])

        setData({ daily: dailyRes, sections: sectionsRes })
      } catch (e) {
        if (isAbortError(e)) return
        logError(e, 'AnalyticsHook')

        if (e instanceof HttpError && e.status === 401) {
          setFatalError(e)
        } else {
          setUiError(toErrorMessage(e))
          setData({ daily: null, sections: null })
        }
      } finally {
        setIsLoading(false)
      }
    })

    return () => controller.abort()
  }, [range])

  return {
    daily: data.daily,
    sections: data.sections,
    isLoading: isLoading || isPending,
    error: uiError,
  }
}