import Link from 'next/link'

import LocaleSwitcher from '@/components/features/LocaleSwitcher'

type Props = {
  containerClass: string
  title: string
  isMenuOpen: boolean
  onOpenMenu: () => void
  openMenuLabel: string
}

export default function SiteHeaderMobile({ containerClass, title, openMenuLabel, isMenuOpen, onOpenMenu }: Props) {
  return (
    <div className={`${containerClass} flex h-[70px] items-center justify-between md:hidden`}>
      <Link href="/" className="transition-opacity hover:opacity-70">
        <span className="header-title">
          {title}
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <LocaleSwitcher />
        <button
          onClick={onOpenMenu}
          className="p-2 text-accent"
          aria-label={openMenuLabel}
          aria-controls="site-mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-9 w-9"
          >
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
