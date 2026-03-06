import clsx from 'clsx'

import { DashboardLoader } from '@/shared/ui/DashboardLoader'

const skeletonBlockClass = 'rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center'

export function ChartSkeleton() {
  return (
    <section className="mt-8">
      <div className="mb-4 h-5 w-40 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={clsx(skeletonBlockClass, 'h-72')}>
          <DashboardLoader
            title="Loading daily visits chart …"
            description="Fetching data and preparing visualization"
          />
        </div>
        <div className={clsx(skeletonBlockClass, 'h-72')}>
          <DashboardLoader
            title="Loading top sections chart …"
            description="Aggregating sections and visit counts"
          />
        </div>
      </div>
    </section>
  )
}

export function TableSkeleton() {
  return (
    <div className="mt-8 space-y-4">
      <div className="h-10 w-full animate-pulse rounded bg-slate-100" />
      <div className={clsx(skeletonBlockClass, 'h-96')}>
        <DashboardLoader size="lg" title="Loading visit history..." />
      </div>
    </div>
  )
}

export function SummaryCardSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex h-[124px] items-center justify-center rounded-lg bg-gray-100 shadow-sm"
        >
          <DashboardLoader size="sm" />
        </div>
      ))}
    </section>
  )
}