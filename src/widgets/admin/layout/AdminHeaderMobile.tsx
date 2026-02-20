'use client'

import Link from 'next/link'

import { BurgerButton } from '@/shared/ui/BurgerButton'
import { Badge } from '@/shared/ui/Badge'

type Props = {
  isMenuOpen: boolean
  isDemo?: boolean
  onOpenMenuAction: () => void
  openMenuLabel: string
}

export function AdminHeaderMobile({ isMenuOpen, isDemo, onOpenMenuAction, openMenuLabel }: Props) {
  return (
    <div className="flex w-full items-center justify-between md:hidden">
      <Link href="/public" className="transition-opacity hover:opacity-70">
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
          onClick={onOpenMenuAction}
          ariaLabel={openMenuLabel}
          ariaControls="admin-mobile-menu"
        />

      </div>
    </div>
  )
}

