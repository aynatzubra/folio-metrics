'use client'

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { useTranslations } from 'next-intl'

import { CONTACT_LINKS, NAV_LINKS } from '@/data/navigation'

type SiteMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SiteMobileMenu({ isOpen, onClose }: SiteMobileMenuProps) {
  const t = useTranslations('Header')
  const tCommon = useTranslations('Common')

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50 lg:hidden">
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
            className="
              fixed inset-y-0 right-0 flex h-full w-full max-w-xs flex-col
              bg-[#FCF8F6] px-6 py-5 text-gray-900 shadow-xl
            "
          >
            {/* logo and close btn */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F67769]">
                {t('title')}
              </span>

              <button
                onClick={onClose}
                className="rounded-sm p-2 text-gray-400 transition hover:text-gray-700 focus:outline-none"
                aria-label="Закрыть меню"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7"
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                  {tCommon('menuTitle')}
                </p>
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="
                        block rounded-md px-2 py-2 text-base font-medium
                        text-gray-800 hover:bg-[#FBE1D0]/60 hover:text-[#111827]
                      "
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* contact */}
              <div className="mt-6 border-t border-[#FBE1D0] pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                  {tCommon('contacts')}
                </p>
                <div className="space-y-1">
                  {CONTACT_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="
                        block rounded-md px-2 py-2 text-sm font-medium
                        text-[#F67769] hover:bg-[#FBE1D0]/60
                      "
                      onClick={onClose}
                    >
                      {tCommon(link.labelKey)}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* slog */}
            <div className="mt-4 border-t border-[#FBE1D0] pt-3 text-xs text-gray-400">
              <p>{tCommon('finalWords')}</p>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
