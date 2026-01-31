'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'
import SiteMobileMenu from '@/components/layout/SiteMobileMenu'
import { NAV_LINKS } from '@/data/navigation'

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

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 text-[#262626] ${
          isScrolled
            ? 'bg-[#0b363d]/80 backdrop-blur-md shadow-lg text-[#fff]'
            : 'bg-transparent pt-4'
        }`}
      >
        {/*DESKTOP VERSION*/}
        <div className="mx-auto max-w-[1470px] hidden md:grid grid-cols-3 h-[70px] items-center">
          {/* Logo */}
          <div className="flex justify-start">
            <Link href="/" className="transition-opacity hover:opacity-60">
              <h2
                className="text-accent text-2xl font-bold uppercase tracking-[0.10em] transition-colors duration-150 ease-out hover:text-accent/80">
                arbuz
              </h2>
            </Link>
          </div>

          {/* Nav + locale */}
          <nav className="flex flex-[2] items-center justify-center lg:gap-10">
            <ul className="hidden items-center gap-12 text-sm font-medium tracking-wide md:flex">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#ff8945]"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-end">
            <LocaleSwitcher />
          </div>
        </div>

        {/*MOBILE VERSION*/}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/">
            <h2
              className="
              text-md font-bold uppercase text-accent p-2 ml-6
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
