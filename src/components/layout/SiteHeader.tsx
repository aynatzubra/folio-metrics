'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'
import SiteMobileMenu from '@/components/layout/SiteMobileMenu'
import { HEADER_CONTACTS, NAV_LINKS } from '@/data/navigation'
import { CONTACT_ICONS } from '@/components/common/contactIcons'
import { useNavActiveByClick } from '@/lib/hooks/useClearOnUserScrollIntent'

export default function SiteHeader() {
  const t = useTranslations('Header')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { activeHref, setActiveHref, isScrolled } = useNavActiveByClick({
    scrolledY: 10,
    topResetY: 2,
  })

  useEffect(() => {
    if (window.location.hash) setActiveHref(window.location.hash)
  }, [])

  const container = 'mx-auto max-w-[1470px] px-6 lg:px-10'

  const iconButton =
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
        className={[
          'sticky top-0 z-50 w-full site-header-main transition-colors',
          isScrolled ? 'bg-black/70 backdrop-blur' : 'bg-transparent',
        ].join(' ')}
      >
        {/* DESKTOP VERSION */}
        <div className={`${container} hidden md:flex h-[70px] items-center justify-between gap-6`}>
          <div className="shrink-0">
            <Link href="/" className="transition-opacity hover:opacity-60">
              <h2 className="text-accent text-2xl font-bold uppercase tracking-[0.10em]">arbuz</h2>
            </Link>
          </div>

          <nav className="flex min-w-0">
            <ul className="flex items-center justify-center gap-8 lg:gap-12 text-sm font-medium tracking-wide nav-link-fix">
              {NAV_LINKS.map((item) => {
                  const isActive = activeHref === item.href

                const inactiveClass = isScrolled
                  ? 'text-white/80 hover:text-white'
                  : 'text-brand hover:opacity-80'

                const activeClass = isScrolled
                  ? 'text-[#F5F6F4] underline underline-offset-8'
                  : 'text-accent underline underline-offset-8'

                  return (
                    <li key={item.href} className="shrink-0">
                      <Link
                        href={item.href}
                        onClick={() => setActiveHref(item.href)}
                        className={[
                          'nav-link-fix transition-colors duration-150',
                          isActive ? activeClass : inactiveClass,
                        ].join(' ')}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  )
                },
              )}
            </ul>
          </nav>

          <div className="shrink-0 flex items-center gap-3">
            <div className="flex items-center gap-3 contacts-container-logic">
              <span className="hidden lg:inline text-xs text-accent font-medium tracking-widest uppercase">
                contacts:
              </span>
              <div className="flex items-center gap-1.5">
                {HEADER_CONTACTS.map((link) => (
                  <a
                    key={link.href} href={link.href}
                    target="_blank" rel="noreferrer noopener"
                    className={iconButton}>
                    {CONTACT_ICONS[link.icon]}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className={`${container} flex h-[70px] items-center justify-between md:hidden`}>
          <Link href="/" className="transition-opacity hover:opacity-70">
            <span className="text-md font-bold uppercase text-accent tracking-[0.10em]">{t('title')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-accent">
              <svg
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="w-8 h-8">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <SiteMobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}