'use client'

import ReactECharts from 'echarts-for-react'

import type { EChartsOption } from 'echarts'

type DailyPoint = {
  day: string
  count: number
}

type DailyVisitsChartProps = {
  data: DailyPoint[]
  isLoading: boolean
  error: string | null
}

export default function DailyVisitsChart({ data, isLoading, error }: DailyVisitsChartProps) {
  const hasData = data && data.length > 0

  const categories = hasData ? data.map((point) => point.day) : []
  const values = hasData ? data.map((point) => point.count) : []

  const option: EChartsOption = {
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
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-2 text-base font-semibold">Daily visits (last 30 days)</h3>

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
        <ReactECharts option={option} style={{ height: 280 }} />
      )}
    </div>
  )
}