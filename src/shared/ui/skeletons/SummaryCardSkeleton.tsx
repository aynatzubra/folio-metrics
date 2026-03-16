import { DashboardLoader } from '@/shared/ui'

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