'use client'

import Link from 'next/link'

import { BurgerButton } from '@/shared/ui/BurgerButton'
import { Badge } from '@/shared/ui/Badge'

type Props = {
  isMenuOpen: boolean
  isDemo?: boolean
  onOpenMenu: () => void
  openMenuLabel: string
}

export default function AdminHeaderMobile({ isMenuOpen, isDemo, onOpenMenu, openMenuLabel }: Props) {
  return (
    <div className="flex w-full items-center justify-between md:hidden">
      <Link href="/" className="transition-opacity hover:opacity-70">
        <span className="header-title text-white">arbuz</span>
      </Link>

      <div className="flex items-center gap-3">
        {isDemo && (
          <Badge isFilled={true}>
            Demo
          </Badge>
        )}

        <BurgerButton
          isOpen={isMenuOpen}
          onClick={onOpenMenu}
          ariaLabel={openMenuLabel}
          ariaControls="admin-mobile-menu"
        />

      </div>
    </div>
  )
}

