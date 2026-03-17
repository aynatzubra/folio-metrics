'use client'

import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { PRIMARY_CONTACTS } from '@/entities/contact'
import { NAV_LINKS } from '@/widgets/site/layout/model'
import { SocialLinksList } from '@/shared/ui'

type SiteMobileMenuProps = {
  onClose: () => void
}

const panelClass =
  'fixed inset-y-0 right-0 flex h-full w-full max-w-xs flex-col ' +
  'bg-mob-menu px-6 py-5 text-white shadow-xl'

const navLinkClass =
  'block rounded-md px-2 py-2 text-xl font-medium tracking-widest' +
  'text-white hover:bg-brand/5 hover:text-accent'

const closeButton =
  'rounded-sm p-2 text-white/70 transition hover:text-white/30' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b3a41]'

export function SiteMenuContent({ onClose }: SiteMobileMenuProps) {
  const t = useTranslations('Header')
  const tCommon = useTranslations('Common')

  const socialData = PRIMARY_CONTACTS.map(contact => ({
    ...contact,
    label: tCommon(contact.labelKey),
  }))

  return (
    <div
      id="site-mobile-menu"
      className={panelClass}
    >
      {/* logo and close btn */}
      <div className="mb-6 flex items-center justify-between">
        <Dialog.Title className="text-2xl font-bold uppercase tracking-[0.18em] text-accent">
          {t('title')}
        </Dialog.Title>

        <button
          onClick={onClose}
          className={closeButton}
          aria-label={tCommon('closeMenu')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* nav */}
      <nav className="flex flex-1 flex-col gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/30">
            {tCommon('menuTitle')}
          </p>
          <div className="space-y-1 mt-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={navLinkClass}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* ui */}
        <div className="mt-6 border-t border-white/30 pt-4">
          <SocialLinksList
            links={socialData}
            className="flex gap-4 mt-4"
            itemClass="text-white hover:text-accent transition-colors"
          />
        </div>
      </nav>

      {/* slog */}
      <div className="mt-4 pt-3 pb-10 pb-[env(safe-area-inset-bottom)] text-xl text-center text-white/80">
        <p>{tCommon('finalWords')}</p>
      </div>
    </div>
  )
}
