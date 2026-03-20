'use client'

import Link from 'next/link'
import { useTransition } from 'react'

import { Badge } from '@/shared/ui'
import { logoutAction } from '@/features/admin/logout'
import { myAdminAva } from '@/shared/assets/images'
import { useMobileMenu } from '@/shared/lib/hooks'

import { AdminHeaderMobile, UserMenu, AdminMobileMenu, SocialLinks } from './index'

type AdminHeaderProps = {
  isDemo?: boolean
}

export function AdminHeader({ isDemo }: AdminHeaderProps) {
  const { isOpen, close, open } = useMobileMenu()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[70px] bg-brand px-4 shadow-[0_2px_4px_rgba(15,34,58,.12)]">
        <div className="w-full h-full max-w-[1276px] mx-auto flex items-center">
          {/*DESKTOP VERSION*/}
          <div className="hidden md:flex w-full items-center justify-between">
            {/*Left block*/}
            <Link
              href="/" aria-label="Go to homepage"
              className="transition-opacity hover:opacity-70">
              <span className="header-title">
                arbuz
              </span>
            </Link>

            {/*Right Block*/}
            <div className="flex items-center gap-3 sm:gap-4">
              {/*Demo Block*/}
              <div className="flex items-center gap-3 mx-[40px]">
                <span className="text-lg font-semibold text-white">Folio-Metrics Admin</span>
                {isDemo && (
                  <Badge>
                    Demo
                  </Badge>
                )}
              </div>

              {/*Socials Buttons*/}
              <SocialLinks className="flex items-center gap-3 sm:gap-4" />

              {/* Avatar Dropdown */}
              <UserMenu
                avatar={myAdminAva}
                onLogout={handleLogout}
                isLoading={isPending}
              />
            </div>
          </div>

          {/*MOBILE VERSION*/}
          <AdminHeaderMobile
            isDemo={isDemo}
            isMenuOpen={isOpen}
            isLoading={isPending}
            onOpenMenu={open}
            openMenuLabel={'Open menu'}
          />
        </div>
      </header>

      <AdminMobileMenu
        isOpen={isOpen}
        onClose={close}
        onLogout={handleLogout}
        user={{ name: 'Admin', avatar: myAdminAva }}
      />
    </>
  )
}

