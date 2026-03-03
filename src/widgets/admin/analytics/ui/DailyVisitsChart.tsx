'use client'

import { useMemo } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'

import { DailyPoint } from '@/entities/analytics'
import { echarts } from '@/shared/lib/echarts'

import type { EChartsOption } from 'echarts'

type DailyVisitsChartProps = {
  data: DailyPoint[]
  isLoading: boolean
  error: string | null
  range: 0 | 7 | 14 | 30
}

const getOption = (categories: string[], values: number[]): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '8%',
    right: '4%',
    bottom: '8%',
    top: '12%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: categories,
    axisLabel: {
      formatter: (value: string) => value.slice(5),
    },
  },
  yAxis: {
    type: 'value',
    name: 'Visits',
    minInterval: 1,
  },
  series: [
    {
      name: 'Daily visits',
      type: 'line',
      smooth: true,
      data: values,
      areaStyle: {},
      symbolSize: 6,
    },
  ],
})

export function DailyVisitsChart({ data, isLoading, error, range }: DailyVisitsChartProps) {
  const hasData = data && data.length > 0

  const option = useMemo(() => {
    const categories = hasData ? data.map((point) => point.day) : []
    const values = hasData ? data.map((point) => point.count) : []
    return getOption(categories, values)
  }, [data, hasData])

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-2 text-base font-semibold text-gray-400">Daily visits (last {range} days)</h3>

      {isLoading && (
        <div className="flex h-72 items-center justify-center text-sm text-gray-500">
          Loading chart...
        </div>
      )}

      {!isLoading && error && (
        <div className="flex h-72 items-center justify-center text-sm text-red-600">
          Failed to load daily stats.
        </div>
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