import clsx from 'clsx'

import { DashboardLoader } from '@/shared/ui'

const skeletonBlockClass = 'rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center'

export function ChartSkeleton() {
  return (
    <section className="mt-8">
      <div className="mb-4 h-5 w-40 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={clsx(skeletonBlockClass, 'h-[380px]')}>
          <DashboardLoader
            title="Loading daily visits chart …"
            description="Fetching data and preparing visualization"
          />
        </div>
        <div className={clsx(skeletonBlockClass, 'h-[380px]')}>
          <DashboardLoader
            title="Loading top sections chart …"
            description="Aggregating sections and visit counts"
          />
        </div>
      </div>
    </section>
  )
}