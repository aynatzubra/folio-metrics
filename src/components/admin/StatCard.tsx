type StatCardProps = {
  title: string
  value: string | number
  isLoading: boolean
}

export default function StatCard({ title, value, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div
      className="
      bg-white p-6 rounded-lg shadow-[0_1px_2px_rgba(56,65,74,.15)]
      transition-all duration-300 ease-in-out
      hover:translate-y-[-0.3rem]
      hover:shadow-[0_5px_10px_rgba(30,32,37,.12)]
      "
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}