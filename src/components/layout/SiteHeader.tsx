'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'
import SiteMobileMenu from '@/components/layout/SiteMobileMenu'
import { NAV_LINKS } from '@/data/navigation'

export default function SiteHeader() {
  const t = useTranslations('Header')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#F6D8C2]/50 backdrop-blur shadow-[0_2px_4px_rgba(15,34,58,.12)]">
        {/*DESKTOP VERSION*/}
        <div className="mx-auto hidden md:flex h-[70px] max-w-[1276px] items-center px-6 md:px-14">
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Link href="/">
              <h2
                className="w-[230px] h-[38px]
                  text-2xl font-bold uppercase text-[#F67769] text-center
                  cursor-pointer transition-opacity hover:opacity-60"
              >
                {t('title')}
              </h2>
            </Link>
          </div>

          {/* Nav + locale */}
          <nav className="flex flex-[2] items-center justify-end lg:gap-10">
            <ul className="hidden items-center gap-6 text-xs font-medium tracking-wide text-[#4B5563] md:flex">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#F67769]"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <LocaleSwitcher />

          </nav>
        </div>

        {/*MOBILE VERSION*/}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/">
            <h2
              className="
              text-md font-bold uppercase text-[#F67769] p-2 ml-6
              cursor-pointer transition-opacity hover:opacity-60"
            >
              {t('title')}
            </h2>
          </Link>

          <LocaleSwitcher />

          {/*Burger*/}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-black transition hover:text-black focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#F67769"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round" strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>
      <SiteMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      /></>
  )
}
