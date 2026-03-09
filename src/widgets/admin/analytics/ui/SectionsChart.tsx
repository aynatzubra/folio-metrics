'use client'

import React, { useMemo } from 'react'

import { DataPlaceholder } from '@/widgets/admin/dashboard'
import { SectionPoint } from '@/entities/analytics'
import { EChartBase } from '@/shared/lib/echarts'
import { ChartContainerWrapper } from '@/widgets/admin/analytics'

import type { EChartsOption } from 'echarts'

type Props = {
  data: SectionPoint[]
  range: number
  isLoading?: boolean
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

export function SectionsChart({ data, range, isLoading }: Props) {
  const hasData = data.length > 0

  const option = useMemo(() => {
    if (data.length === 0) return null

    const categories = data.map((item) => item.sectionId || 'unknown')
    const values = data.map((item) => item.count)

    return getOption(categories, values)
  }, [data, hasData])

  return (
    <ChartContainerWrapper
      title="Top sections" range={range}
      isLoading={isLoading}>
      {!hasData ? (
        <DataPlaceholder type="empty" message="No daily activity recorded." />
      ) : (
        <EChartBase option={option!} className="w-full h-full" />
      )}
    </ChartContainerWrapper>
  )
}
