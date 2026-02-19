'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { DailyPoint, RangeOptionValue, SectionPoint } from '@/lib/analytics/types'
import { ANALYTICS_RANGE_OPTIONS } from '@/lib/constants/analytics'
import { DailyVisitsChart, SectionsChart } from '@/widgets/admin/analytics/index'

type Props = {
  initialRange: RangeOptionValue
  initialDaily: DailyPoint[] | null
  initialSections: SectionPoint[] | null
}

export function AnalyticsCharts({ initialRange, initialDaily, initialSections }: Props) {
  const [range, setRange] = useState<RangeOptionValue>(30)
  const { daily, sections, isLoading, error } = useAnalytics(range, {
    initialRange,
    initialDaily,
    initialSections,
  })

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Traffic Overview</h2>

        <div className="mt-3 sm:mt-0 flex items-center gap-2 text-sm text-gray-600">
          <div className="inline-flex items-center gap-2 overflow-hidden">
            {ANALYTICS_RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRange(option.value)}
                className={clsx(
                  'cursor-pointer rounded-[0.2rem] px-3 py-2 text-xs font-medium transition',
                  option.value === range
                    ? 'bg-[#5070DD] text-white hover:opacity-90'
                    : 'bg-[#C7D3FF] text-[#5070DD] hover:bg-[#5070DD] hover:text-white',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyVisitsChart
          data={daily || []}
          isLoading={isLoading}
          error={error}
          range={range}
        />
        <SectionsChart
          data={sections || []}
          isLoading={isLoading}
          error={error}
          range={range}
        />
      </div>
    </section>
  )
}