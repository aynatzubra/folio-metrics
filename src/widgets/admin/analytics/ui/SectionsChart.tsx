'use client'

import React, { useMemo } from 'react'

import { DataPlaceholder } from '@/widgets/admin/dashboard'
import { SectionPoint } from '@/entities/analytics'
import { EChartBase } from '@/shared/lib/echarts'

import type { EChartsOption } from 'echarts'

type Props = {
  data: SectionPoint[]
  range: number
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

export function SectionsChart({ data, range }: Props) {
  const hasData = data.length > 0

  const option = useMemo(() => {
    if (data.length === 0) return null

    const categories = data.map((item) => item.sectionId || 'unknown')
    const values = data.map((item) => item.count)

    return getOption(categories, values)
  }, [data, hasData])

  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-sm border border-slate-100 h-[380px]">
      <h3 className="mb-6 text-sm font-semibold tracking-wider text-slate-400">
        Top sections (last {range} days)
      </h3>

      <div className="relative flex flex-1 items-center justify-center">
        {!hasData && (
          <DataPlaceholder type="empty" message="No section activity recorded." />
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
