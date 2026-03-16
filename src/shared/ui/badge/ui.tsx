import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface BadgeProps {
  children: ReactNode;
  isFilled?: boolean;
  className?: string;
}

export const Badge = ({ children, isFilled = false, className }: BadgeProps) => (
  <span
    className={clsx(
      'rounded-full border-2 border-accent px-3 py-0.5 text-[10px] font-bold uppercase text-accent transition-colors',
      isFilled && 'bg-accent text-white',
      className,
    )}
  >
    {children}
  </span>
)