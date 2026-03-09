'use client'

import { useMemo } from 'react'

import { DailyPoint } from '@/entities/analytics'
import { DataPlaceholder } from '@/widgets/admin/dashboard'
import { EChartBase } from '@/shared/lib/echarts'

import type { EChartsOption } from 'echarts'

type Props = {
  data: DailyPoint[]
  range: number
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

export function DailyVisitsChart({ data, range }: Props) {
  const hasData = data.length > 0

  const option = useMemo(() => {
    if (data.length === 0) return null

    const categories = data.map((point) => point.day)
    const values = data.map((point) => point.count)

    return getOption(categories, values)
  }, [data, hasData])

  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-sm border border-slate-100 h-[380px]">
      <h3 className="mb-6 text-sm font-semibold tracking-wider text-slate-400">
        Daily visits (last {range} days)
      </h3>

      <div className="relative flex flex-1 items-center justify-center">
        {!hasData && (
          <DataPlaceholder type="empty" message="No daily activity recorded." />
        )}

        {hasData && option && (
          <EChartBase
            option={option}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  )
}