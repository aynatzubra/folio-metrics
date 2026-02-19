'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { locales } from '@/i18n/config'

interface LocaleSwitcherProps {
  isScrolled?: boolean
}

export function LocaleSwitcher({ isScrolled }: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const switchBtnClass =
    'cursor-pointer px-[14px] py-[6px] rounded-[4px] border-2 border-accent ' +
    'text-accent font-[Inter] font-semibold leading-[100%]' +
    'transition-colors duration-150 ease-out ' +
    'hover:bg-accent/40 hover:text-white/60 active:bg-accent/80 focus-visible:ring-2 ' +
    'focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-background'

  const scrollDependentClass = isScrolled
    ? 'border-accent bg-accent text-white hover:bg-accent/90 active:bg-accent/80 focus-visible:ring-white/40'
    : 'border-accent bg-transparent text-accent hover:bg-accent/40 hover:text-white/60 focus-visible:ring-accent/40'

  const nextLocale =
    locales.find((locale) => locale !== currentLocale) || currentLocale

  const handleSwitch = (newLocale: string) => {
    if (newLocale === currentLocale) return

    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <button
      type="button"
      onClick={() => handleSwitch(nextLocale)}
      className={`${switchBtnClass} ${scrollDependentClass}`}
    >
      {nextLocale.toUpperCase()}
    </button>
  )
}

// className="rounded-[4px] bg-accent text-white px-4 py-2 font-semibold  tracking-[0.10em] transition-colors cursor-pointer duration-150 ease-out hover:bg-accent/90 active:bg-accent/80 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
