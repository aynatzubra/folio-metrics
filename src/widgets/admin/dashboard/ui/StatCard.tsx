type StatCardProps = {
  title: string
  value: string | number
}

const cardClass =
  'rounded-lg bg-white p-6 shadow-[0_1px_2px_rgba(56,65,74,.15)] ' +
  'transition-all duration-300 ease-in-out ' +
  'hover:-translate-y-[0.3rem] hover:shadow-[0_5px_10px_rgba(30,32,37,.12)]'

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className={cardClass}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}