import { useState, useEffect } from 'react'

import { fetchJson } from '@/lib/http/fetchJson'
import { logError, toErrorMessage } from '@/lib/utils/error-handler'
import { DailyPoint, RangeOptionValue, SectionPoint } from '@/lib/analytics/types'
import { AsyncState } from '@/lib/http/fetchState'

export function useAnalytics(range: RangeOptionValue) {
  const [daily, setDaily] = useState<AsyncState<DailyPoint[]>>({
    data: null, isLoading: true, error: null,
  })
  const [sections, setSections] = useState<AsyncState<SectionPoint[]>>({
    data: null, isLoading: true, error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const setPending = () => {
      setDaily(p => ({ ...p, isLoading: true, error: null }))
      setSections(p => ({ ...p, isLoading: true, error: null }))
    }

    setPending()

    const loadData = async () => {
      try {
        const [dailyRes, sectionsRes] = await Promise.allSettled([
          fetchJson<DailyPoint[]>(`/api/admin/stats/daily?days=${range}`, { signal: controller.signal }),
          fetchJson<SectionPoint[]>(`/api/admin/stats/sections?days=${range}`, { signal: controller.signal }),
        ])

        if (dailyRes.status === 'fulfilled') {
          setDaily({ data: dailyRes.value, isLoading: false, error: null })
        } else {
          logError(dailyRes.reason, 'Daily Chart')
          setDaily({ data: null, isLoading: false, error: toErrorMessage(dailyRes.reason) })
        }

        if (sectionsRes.status === 'fulfilled') {
          setSections({ data: sectionsRes.value, isLoading: false, error: null })
        } else {
          logError(sectionsRes.reason, 'Sections Chart')
          setSections({ data: null, isLoading: false, error: toErrorMessage(sectionsRes.reason) })
        }

      } catch (e) {
        if (controller.signal.aborted) return
        logError(e, 'General Analytics Hook')
      }
    }

    loadData()
    return () => controller.abort()
  }, [range])

  return { daily, sections, hasAnyError: !!(daily.error || sections.error) }
}