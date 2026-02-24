import { BurgerIcon } from '@/shared/ui'

interface BurgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
  ariaLabel: string;
  ariaControls: string;
  className?: string;
}

export const BurgerButton = ({
                               onClick,
                               isOpen,
                               ariaLabel,
                               ariaControls,
                               className = 'p-2 text-accent',
                             }: BurgerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      type="button"
    >
      <BurgerIcon className="h-9 w-9" />
    </button>
  )
}