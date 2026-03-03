export function ChartSkeleton() {
  return (
    <section className="mt-8">
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

export function TableSkeleton() {
  return (
    <div className="mt-4 space-y-4">
      <div className="h-10 w-full animate-pulse rounded bg-slate-100" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 w-full animate-pulse rounded bg-slate-50" />
      ))}
    </div>
  )
}

export function SummaryCardSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[124px] animate-pulse rounded-lg bg-gray-100 p-6 shadow-[0_1px_2px_rgba(56,65,74,.15)]"
        >
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-8 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </section>
  )
}