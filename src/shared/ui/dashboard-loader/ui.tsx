import clsx from 'clsx'

type DashboardLoaderProps = {
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function DashboardLoader({ title, description, size = 'md', className }: DashboardLoaderProps) {
  const spinnerSizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div className={clsx('flex flex-col items-center justify-center text-slate-500', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-slate-300 border-t-slate-500',
          spinnerSizes[size],
        )}
      />
      {title && <p className="mt-2 text-xs font-medium">{title}</p>}
      {description && <p className="mt-1 text-[11px] text-slate-500">{description}</p>}
    </div>
  )
}