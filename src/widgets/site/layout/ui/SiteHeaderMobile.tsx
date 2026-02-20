import Link from 'next/link'

import { BurgerButton } from '@/shared/ui/BurgerButton'
import { LocaleSwitcher } from '@/features/locale-switcher'

type Props = {
  containerClass: string
  title: string
  isMenuOpen: boolean
  onOpenMenu: () => void
  openMenuLabel: string
}

export function SiteHeaderMobile({ containerClass, title, openMenuLabel, isMenuOpen, onOpenMenu }: Props) {
  return (
    <div className={`${containerClass} flex h-[70px] items-center justify-between md:hidden`}>
      <Link href="/public" className="transition-opacity hover:opacity-70">
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
