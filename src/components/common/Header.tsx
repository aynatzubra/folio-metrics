'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'

export default function Header() {
  const t = useTranslations('Header')

  const navItems = [
    { href: '#intro', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#adds', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-[0_2px_4px_rgba(15,34,58,.12)]">
      <div className="mx-auto flex h-[70px] max-w-[1276px] items-center px-6 md:px-14">
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
        <nav className="flex flex-[2] items-center justify-end gap-10">
          <ul className="hidden items-center gap-6 text-xs font-medium tracking-wide text-[#4B5563] md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#F67769]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  )
}
