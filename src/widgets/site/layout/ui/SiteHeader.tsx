'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { CONTACT_ICONS } from '@/shared/ui'
import { LocaleSwitcher } from '@/features/site/locale-switcher'
import { SOCIAL_LINKS } from '@/entities/contact'
import { useMobileMenu } from '@/shared/lib/hooks'
import { NAV_LINKS, useNavActiveByClick } from '@/widgets/site/layout/model'

import { SiteMobileMenu, SiteHeaderMobile } from './index'

const container = 'mx-auto max-w-[1470px] px-6 lg:px-10'

const iconButton =
  'inline-flex h-9 w-9 items-center justify-center rounded-[4px] ' +
  'border border-accent text-accent ' +
  'transition-colors duration-150 ease-out ' +
  'hover:bg-accent/40 hover:text-white/60 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background'

export function SiteHeader() {
  const t = useTranslations('Header')

  const { isOpen, close, open } = useMobileMenu()

  const { activeHref, setActiveHref, isScrolled } = useNavActiveByClick({
    scrolledY: 70,
    topResetY: 2,
  })

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full site-header-main transition-colors',
          isScrolled ? 'is-scrolled' : '',
        ].join(' ')}
      >
        {/* DESKTOP VERSION */}
        <div className={`${container} hidden md:flex h-[70px] items-center justify-between gap-6`}>
          <div className="shrink-0">
            <Link
              href="/" aria-label="Go to homepage"
              className="transition-opacity hover:opacity-60">
              <h2 className="header-title">{t('title')}</h2>
            </Link>
          </div>

          <nav className="flex min-w-0">
            <ul
              className="flex items-center justify-center gap-8 lg:gap-12 text-base font-[Inter] font-medium leading-[100%] nav-link-fix">
              {NAV_LINKS.map((item) => {
                  const isActive = activeHref === item.href

                  const inactiveClass = isScrolled
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-800 hover:opacity-80'

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
                {t('contacts')}:
              </span>
              <div className="flex items-center gap-1.5">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={iconButton}
                    aria-label={`Go to my ${link.icon}`}>
                    {CONTACT_ICONS[link.icon]}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-2">
              <LocaleSwitcher isScrolled={isScrolled} />
            </div>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <SiteHeaderMobile
          containerClass={container}
          title={t('title')}
          isMenuOpen={isOpen}
          openMenuLabel={t('openMenu')}
          onOpenMenu={open}
        />
      </header>

      <SiteMobileMenu isOpen={isOpen} onClose={close} />
    </>
  )
}