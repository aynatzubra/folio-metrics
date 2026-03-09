'use client'

import { useEffect, useRef } from 'react'
import { EChartsType } from 'echarts/core'

import { echarts } from './echarts-setup'

import type { EChartsOption } from 'echarts'

type Props = {
  option: EChartsOption
  className?: string
}

export function EChartBase({ option, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<EChartsType | null>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const instance = echarts.init(element)
    chartRef.current = instance
    instance.setOption(option)

    const handleResize = () => {
      chartRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      if (chartRef.current && !chartRef.current.isDisposed()) {
        chartRef.current.dispose()
      }

      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    chartRef.current?.setOption(option, true)
  }, [option])

  return <div ref={containerRef} className={className} />
}