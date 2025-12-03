'use client'

import dynamic from 'next/dynamic'

function ChartsSkeleton() {
  return (
    <section className="mt-8 rounded-lg bg-white p-4 shadow">
      {/*Section title*/}
      <div className="mb-4 h-5 w-40 rounded bg-slate-200 animate-pulse" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily visits */}
        <div className="h-72 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
          <div className="flex flex-col items-center text-xs text-slate-500">
            {/* Spinner */}
            <div className="h-8 w-8 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin" />
            <p className="mt-2 font-medium">Loading daily visits chart …</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Fetching data and preparing visualization
            </p>
          </div>
        </div>

        {/* Top sections */}
        <div className="h-72 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
          <div className="flex flex-col items-center text-xs text-slate-500">
            {/* Spinner */}
            <div className="h-8 w-8 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin" />
            <p className="mt-2 font-medium">Loading top sections chart …</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Aggregating sections and visit counts
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const AnalyticsChartsLazy = dynamic(
  () => import('./AnalyticsCharts'),
  {
    ssr: false,
    loading: ChartsSkeleton,
  },
)

export default function AnalyticsChartsLoader() {
  return <AnalyticsChartsLazy />
}