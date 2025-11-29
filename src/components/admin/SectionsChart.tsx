'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'

import type { EChartsOption } from 'echarts'

type SectionPoint = {
  sectionId: string
  count: number
}

type SectionsChartProps = {
  data: SectionPoint[]
  isLoading: boolean
  error: string | null
}

export default function SectionsChart({ data, isLoading, error }: SectionsChartProps) {
  const hasData = data && data.length > 0

  const categories = hasData ? data.map((item) => item.sectionId || 'unknown') : []
  const values = hasData ? data.map((item) => item.count) : []

  const option: EChartsOption = {
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
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-2 text-base font-semibold">Top sections (last 30 days)</h3>

      {isLoading && (
        <div className="flex h-72 items-center justify-center text-sm text-gray-500">
          Loading chart...
        </div>
      )}

      {!isLoading && error && (
        <div className="flex h-72 items-center justify-center text-sm text-red-600">
          Failed to load section stats.
        </div>
      )}

      {!isLoading && !error && !hasData && (
        <div className="flex h-72 items-center justify-center text-sm text-gray-500">
          Not enough data yet.
        </div>
      )}

      {!isLoading && !error && hasData && (
        <ReactECharts option={option} style={{ height: 280 }} />
      )}
    </div>
  )
}
