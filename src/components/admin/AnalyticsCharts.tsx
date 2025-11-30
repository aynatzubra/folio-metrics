'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import DailyVisitsChart from '@/components/admin/DailyVisitsChart'
import SectionsChart from '@/components/admin/SectionsChart'
import { FetchState } from '@/lib/shared/async'
import { fetchJson } from '@/lib/http/fetchJson'

import type { DailyPoint, SectionPoint } from '@/lib/analytics/types'

type RangeOption = 7 | 14 | 30

const RANGE_OPTIONS: { label: string; value: RangeOption }[] = [
  { label: '7 days', value: 7 },
  { label: '14 days', value: 14 },
  { label: '30 days', value: 30 },
]

export default function AnalyticsCharts() {
  const [daily, setDaily] = useState<FetchState<DailyPoint[]>>({
    data: null,
    isLoading: true,
    error: null,
  })
  const [sections, setSections] = useState<FetchState<SectionPoint[]>>({
    data: null,
    isLoading: true,
    error: null,
  })
  const [range, setRange] = useState<RangeOption>(30)

  useEffect(() => {
    let cancelled = false

    async function loadDaily() {
      try {
        setDaily((prev) => ({ ...prev, isLoading: true, error: null }))
        const data = await fetchJson<DailyPoint[]>(`/api/admin/stats/daily?days=${range}`)
        if (!cancelled) {
          setDaily({ data, isLoading: false, error: null })
        }
      } catch (error) {
        if (!cancelled) {
          setDaily({ data: null, isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' })
        }
      }
    }

    async function loadSections() {
      try {
        setSections((prev) => ({ ...prev, isLoading: true, error: null }))

        const data = await fetchJson<SectionPoint[]>('/api/admin/stats/sections?days=${range}')
        if (!cancelled) {
          setSections({ data, isLoading: false, error: null })
        }

      } catch (error) {
        if (!cancelled) {
          setSections({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    loadDaily()
    loadSections()

    return () => {
      cancelled = true
    }
  }, [range])

  const hasAnyError = daily.error || sections.error

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Traffic Overview</h2>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Range:</span>
        <div className="inline-flex overflow-hidden rounded-md border border-gray-200 bg-white">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRange(option.value)}
              className={clsx(
                'px-3 py-1.5 text-xs font-medium transition',
                option.value === range
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

  {
    hasAnyError && (
      <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
        Failed to load analytics data. Try reloading the page.
      </div>
    )
  }

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <DailyVisitsChart
      data={daily.data ?? []}
      isLoading={daily.isLoading}
      error={daily.error}
      range={range}
    />
    <SectionsChart
      data={sections.data ?? []}
      isLoading={sections.isLoading}
      error={sections.error}
      range={range}
    />
  </div>
</section>
)
}