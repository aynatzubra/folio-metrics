'use client'

import Link from 'next/link'

import { Badge, BurgerButton } from '@/shared/ui'

type Props = {
  isMenuOpen: boolean
  isDemo?: boolean
  onOpenMenuAction: () => void
  openMenuLabel: string
  isLoading: boolean
}

export function AdminHeaderMobile({ isMenuOpen, isDemo, onOpenMenuAction, openMenuLabel }: Props) {
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
          onClick={onOpenMenuAction}
          ariaLabel={openMenuLabel}
          ariaControls="admin-mobile-menu"
        />

      </div>
    </div>
  )
}

