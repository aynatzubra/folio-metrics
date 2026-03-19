'use client'

import { useEffect, useState } from 'react'

import { AnalyticsRangeFilter, RangeOptionValue } from '@/features/admin/analytics-filters'

import { useAnalyticsDashboard } from '../model'
import { AnalyticsChartsProps } from '../model'

import { DailyVisitsChart, SectionsChart } from './index'


export function AnalyticsCharts({
                                  initialRange = 30,
                                  initialDaily = [],
                                  initialSections = [],
                                }: AnalyticsChartsProps) {
  const [range, setRange] = useState<RangeOptionValue>(initialRange)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { daily, sections } = useAnalyticsDashboard(range, {
    range: initialRange,
    data: {
      dailyActivity: initialDaily,
      sectionStats: initialSections,
    },
  })

  if (!mounted) {
    return (
      <section className="mt-8">
        <div className="h-[400px] animate-pulse rounded-lg bg-slate-50" />
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Traffic Overview</h2>
        <AnalyticsRangeFilter value={range} onChange={setRange} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyVisitsChart data={daily} range={range} />
        <SectionsChart data={sections} range={range} />
      </div>
    </section>
  )
}