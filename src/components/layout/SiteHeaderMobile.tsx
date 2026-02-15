import Link from 'next/link'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'
import { BurgerButton } from '@/shared/ui/BurgerButton'

type Props = {
  containerClass: string
  title: string
  isMenuOpen: boolean
  onOpenMenu: () => void
  openMenuLabel: string
}

export default function SiteHeaderMobile({ containerClass, title, openMenuLabel, isMenuOpen, onOpenMenu }: Props) {
  return (
    <div className={`${containerClass} flex h-[70px] items-center justify-between md:hidden`}>
      <Link href="/" className="transition-opacity hover:opacity-70">
        <span className="header-title">
          {title}
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <LocaleSwitcher />
        <BurgerButton
          isOpen={isMenuOpen}
          onClick={onOpenMenu}
          ariaLabel={openMenuLabel}
          ariaControls="site-mobile-menu"
        />

      </div>
    </div>
  )
}
