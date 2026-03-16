export function AnalyticsChartsSkeleton() {
  return (
    <div className="w-full h-full animate-pulse rounded bg-slate-50 flex items-end gap-2 px-2 pb-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i} className="flex-1 bg-slate-100 rounded-t"
          style={{ height: `${20 + Math.random() * 60}%` }} />
      ))}
    </div>
  )
}