import { AnalyticsChartsSkeleton } from '@/widgets/admin/dashboard'

type ChartContainerProps = {
  title: string
  range: number
  isLoading?: boolean
  children: React.ReactNode
}

export function ChartContainerWrapper({ title, range, isLoading, children }: ChartContainerProps) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-sm border border-slate-100 h-[380px]">
      <h3 className="mb-6 text-sm font-semibold tracking-wider text-slate-400">
        {title} (last {range} days)
      </h3>
      <div className="relative flex-1">
        {isLoading ? <AnalyticsChartsSkeleton /> : children}
      </div>
    </div>
  )
}