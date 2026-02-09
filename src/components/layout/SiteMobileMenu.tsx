'use client'

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useRef } from 'react'
import { useTranslations } from 'next-intl'

import { NAV_LINKS } from '@/data/navigation'
import ContactInfo from '@/components/common/ContactInfo'

type SiteMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SiteMobileMenu({ isOpen, onClose }: SiteMobileMenuProps) {
  const t = useTranslations('Header')
  const tCommon = useTranslations('Common')

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

  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50 lg:hidden"
        initialFocus={closeBtnRef}
      >
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* panel menu */}
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-200 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-200 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel
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

              {/* contact */}
              <div className="mt-6 border-t border-white/30 pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/30">
                  {tCommon('contacts')}
                </p>
                <ContactInfo variant="footer" className="mt-8 flex items-start justify-start" />
              </div>
            </nav>

            {/* slog */}
            <div className="mt-4 pt-3 pb-10 pb-[env(safe-area-inset-bottom)] text-xl text-center text-white/80">
              <p>{tCommon('finalWords')}</p>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
