'use client'

import { useEffect, useState } from 'react'

import { SOCIAL_LINKS } from '@/entities/contact/model/constants'
import { CONTACT_ICONS } from '@/shared/ui/ContactIcons'

type Props = {
  showAfterY?: number
}

export function FloatingActions({ showAfterY = 400 }: Props) {

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > showAfterY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfterY])

  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!isVisible) return null


  const iconButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-[4px] ' +
    'border border-accent text-accent shadow-lg ' +
    'transition-colors duration-150 ease-out ' +
    'hover:bg-accent hover:text-white/80 ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-background'

  const toolTipClass = 'pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 ' +
    'flex h-11 items-center rounded-md bg-white px-3 text-sm uppercase font-semibold ' +
    'text-accent shadow-lg whitespace-nowrap ' +
    'opacity-0 invisible translate-x-2 transition-all duration-200 ease-out ' +
    'group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 ' +
    'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-x-0 ' +
    'z-50'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {SOCIAL_LINKS.map((link) => (
        <div key={link.href} className="relative group md:hidden">
          <span className={toolTipClass}>
            {link.icon}
            <span
              className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white"
              aria-hidden="true"
            />
          </span>

          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className={iconButton}
            aria-label={link.icon}
            title={link.icon}
          >
            {CONTACT_ICONS[link.icon]}
          </a>
        </div>
      ))}

      <div className="relative group">
        <span
          className={toolTipClass}>
          Back to top
          <span
            className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white"
            aria-hidden="true"
          />
        </span>

        {/* back to top */}
        <button
          type="button"
          onClick={onClick}
          className={iconButton}
          aria-label="Back to top"
          title="">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 14l6-6 6 6" />
            <path d="M6 18l6-6 6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
