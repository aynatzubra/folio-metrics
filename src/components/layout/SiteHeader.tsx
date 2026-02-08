'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'
import SiteMobileMenu from '@/components/layout/SiteMobileMenu'
import { HEADER_CONTACTS, NAV_LINKS } from '@/data/navigation'
import { CONTACT_ICONS } from '@/components/common/contactIcons'

export default function SiteHeader() {
  const t = useTranslations('Header')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBase =
    'sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300'

  const headerState = isScrolled
    ? 'bg-[#0b363d]/90 backdrop-blur-md shadow-lg text-[#fff]'
    : 'bg-transparent pt-4'

  const container = 'mx-auto max-w-[1470px] px-6 lg:px-10'

  const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-[4px] ' +
    'border border-accent text-accent ' +
    'transition-colors duration-150 ease-out ' +
    'hover:bg-accent/40 hover:text-white/60 ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-background'

  return (
    <>
      <header
        className={`${headerBase} ${headerState}`}
      >
        {/*DESKTOP VERSION*/}
        <div className={`${container} hidden md:flex h-[70px] items-center justify-between gap-6`}>
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="transition-opacity hover:opacity-60">
              <h2
                className="text-accent text-2xl font-bold uppercase tracking-[0.10em] transition-colors duration-150 ease-out hover:text-accent/80">
                arbuz
              </h2>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex min-w-0">
            <ul
              className="flex items-center justify-center gap-8 lg:gap-12 text-sm font-medium tracking-wide">
              {NAV_LINKS.map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link href={item.href} className="transition-colors hover:text-[#ff8945]">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts + locale */}
          <div className="shrink-0 flex items-center gap-3">
            {/* Contacts */}
            <div
              className={`flex items-center gap-3
              transition-all duration-300 ease-out
              ${
                isScrolled
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}>
              <span className="hidden lg:inline text-xs text-accent font-medium tracking-widest uppercase">
                contacts:
              </span>

              <div className="flex items-center gap-1.5">
                {HEADER_CONTACTS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.labelKey}
                    className={iconBtn}
                  >
                    {CONTACT_ICONS[link.icon]}
                  </a>
                ))}
              </div>
            </div>

            {/* Locale switcher — всегда */}
            <div className="ml-2">
              <LocaleSwitcher />
            </div>
          </div>

        </div>

        {/*MOBILE VERSION*/}
        <div className={`${container} flex h-[70px] items-center justify-between md:hidden`}>
          <Link href="/" className="transition-opacity hover:opacity-70">
                      <span className="text-md font-bold uppercase text-accent tracking-[0.10em]">
              {t('title')}
            </span>
          </Link>

          <div className="flex items-center gap-2">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <SiteMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      /></>
  )
}
