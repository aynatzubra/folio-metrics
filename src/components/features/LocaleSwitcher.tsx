'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { locales } from '@/i18n/config'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

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
      className="rounded-[4px] bg-accent text-white px-4 py-2 font-semibold  tracking-[0.10em] transition-colors cursor-pointer duration-150 ease-out hover:bg-accent/90 active:bg-accent/80 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {nextLocale.toUpperCase()}
    </button>
  )
}