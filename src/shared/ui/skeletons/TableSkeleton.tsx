import clsx from 'clsx'

import { DashboardLoader } from '@/shared/ui'

const skeletonBlockClass = 'rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center'

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