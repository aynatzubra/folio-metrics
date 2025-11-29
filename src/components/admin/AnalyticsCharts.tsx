'use client'

import { useEffect, useState } from 'react'

import DailyVisitsChart from '@/components/admin/DailyVisitsChart'
import SectionsChart from '@/components/admin/SectionsChart'

type DailyPoint = {
  day: string
  count: number
}

type SectionPoint = {
  sectionId: string
  count: number
}

type FetchState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

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

  useEffect(() => {
    let cancelled = false

    async function loadDaily() {
      try {
        setDaily((prev) => ({ ...prev, isLoading: true, error: null }))
        const data = await fetchJson<DailyPoint[]>('/api/admin/stats/daily?days=30')
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

        const data = await fetchJson<SectionPoint[]>('/api/admin/stats/sections?days=30')
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
  }, [])

  const hasAnyError = daily.error || sections.error

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Traffic Overview</h2>

      {hasAnyError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          Failed to load analytics data. Try reloading the page.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyVisitsChart
          data={daily.data ?? []}
          isLoading={daily.isLoading}
          error={daily.error}
        />
        <SectionsChart
          data={sections.data ?? []}
          isLoading={sections.isLoading}
          error={sections.error}
        />
      </div>
    </section>
  )

}