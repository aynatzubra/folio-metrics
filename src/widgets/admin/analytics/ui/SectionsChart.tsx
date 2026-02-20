'use client'

import React, { useMemo } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'

import echarts from '@/lib/echarts-setup'
import { DataPlaceholder } from '@/widgets/admin/dashboard'
import { SectionPoint } from '@/entities/analytics'

import type { EChartsOption } from 'echarts'

type SectionsChartProps = {
  data: SectionPoint[]
  isLoading: boolean
  error: string | null
  range: 7 | 14 | 30
}

const getOption = (categories: string[], values: number[]): EChartsOption => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} visits',
  },
  grid: {
    left: '8%',
    right: '4%',
    bottom: '5%',
    top: '12%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    name: 'Visits',
    minInterval: 1,
  },
  yAxis: {
    type: 'category',
    data: categories,
  },
  series: [
    {
      type: 'bar',
      data: values,
      barMaxWidth: 24,
    },
  ],
})

export function SectionsChart({ data, isLoading, error, range }: SectionsChartProps) {
  const hasData = data && data.length > 0

  const option = useMemo(() => {
    const categories = hasData ? data.map((item) => item.sectionId || 'unknown') : []
    const values = hasData ? data.map((item) => item.count) : []

    return getOption(categories, values)
  }, [data])

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-2 text-base font-semibold text-gray-400">Top sections (last {range} days)</h3>

      {isLoading && (
        <div className="flex h-72 items-center justify-center text-sm text-gray-500">
          Loading chart...
        </div>
      )}

      {!isLoading && error && (
        <DataPlaceholder
          type="error"
          message="Failed to load daily stats."
          className="h-72"
        />
      )}

      {!isLoading && !error && !hasData && (
        <div className="flex h-72 items-center justify-center text-sm text-gray-500">
          Not enough data yet.
        </div>
      )}

      {!isLoading && !error && hasData && (
        <ReactEChartsCore
          echarts={echarts} option={option}
          style={{ height: 280 }} />
      )}
    </div>
  )
}
