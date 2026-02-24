'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import clsx from 'clsx'

import { locales } from '@/shared/lib/i18n'

import { switchLocaleService } from '../services/switch-locale.service'

interface LocaleSwitcherProps {
  isScrolled?: boolean
}

const BASE_SWITCH_CLASSES =
  'cursor-pointer px-[14px] py-[6px] rounded-[4px] border-2 border-accent ' +
  'text-accent font-[Inter] font-semibold leading-[100%]' +
  'transition-colors duration-150 ease-out ' +
  'hover:bg-accent/40 hover:text-white/60 active:bg-accent/80 focus-visible:ring-2 ' +
  'focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background'

const SCROLLED_CLASSES =
  'border-accent bg-accent text-white hover:bg-accent/90 active:bg-accent/80 focus-visible:ring-white/40'

const TRANSPARENT_CLASSES =
  'border-accent bg-transparent text-accent hover:bg-accent/40 hover:text-white/60 focus-visible:ring-accent/40'

export function LocaleSwitcher({ isScrolled }: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const nextLocale =
    locales.find((locale) => locale !== currentLocale) || currentLocale

  const handleSwitch = (newLocale: string) => {
    if (newLocale === currentLocale) return
    const newPath = switchLocaleService(pathname, nextLocale)
    router.push(newPath)
  }

  return (
    <button
      type="button"
      onClick={() => handleSwitch(nextLocale)}
      className={clsx(BASE_SWITCH_CLASSES, isScrolled ? SCROLLED_CLASSES : TRANSPARENT_CLASSES)}
    >
      {nextLocale.toUpperCase()}
    </button>
  )
}