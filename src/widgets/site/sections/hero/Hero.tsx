'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'


import { ContactInfo } from '../../contact'
import myAva from '../../../../../public/assets/images/0my_ava.png'

export function Hero() {
  const t = useTranslations('Hero')

  const heroBlockClass =
    'relative w-full ' +
    'min-h-full xl:min-h-[calc(100svh-70px)] ' +
    'flex items-start xl:items-center ' +
    'pt-10 pb-12 md:pt-20 md:pb-25 lg:pt-35 lg:pb-35 xl:py-0 xl:pt-0 xl:pb-0 ' +
    '[@media(min-width:840px)_and_(max-width:1023px)]:pt-35 [@media(min-width:840px)_and_(max-width:1023px)]:pb-45 ' +
    '[@media(min-width:641px)_and_(max-width:767px)]:pt-30 [@media(min-width:641px)_and_(max-width:767px)]:pb-40 ' +
    '[@media(min-width:557px)_and_(max-width:640px)]:pt-25'

  const titleClass =
    'uppercase font-bold tracking-[0.05em] leading-[100%] text-[#0b363d] text-[3.5rem] ' +
    'md:text-[5rem] lg:text-[7rem] [@media(min-width:557px)_and_(max-width:767px)]:text-[4.5rem] '

  const introLinkClass =
    'relative inline-block group ' +
    'text-lg font-medium text-accent ' +
    'border-b border-accent/60 pb-2 ' +
    'transition-colors duration-150 ease-out hover:text-accent/85 ' +
    'focus-visible:ring-2 focus-visible:ring-accent/40 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  return (
    <div className={heroBlockClass}>
      <div className="max-w-[1276px] mx-auto w-full px-6 md:px-14">
        <div className="flex flex-col lg:flex-row  justify-between items-start gap-10 xl:gap-16">

          <div className="flex-1">
            <h1 className={titleClass}> Systems-minded<br />Engineer </h1>
            <p
              className="mt-[1em] max-w-[650px] font-[Inter] text-[clamp(14px,0.7rem+0.85vw,18px)] text-gray-800">
              {t('shortText')}
            </p>

            <div className="mt-12 flex items-center gap-4">
              <div className="w-16 h-16 overflow-hidden rounded-full border-3 border-accent">
                <Image
                  src={myAva}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  placeholder="blur"
                  priority
                />
              </div>
              <Link
                href="#intro"
                className={introLinkClass}
              >
                {t('aboutLink')} ↓
                <span
                  className="pointer-events-none absolute left-0 -bottom-0 h-[2px] w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100">
                </span>
              </Link>
            </div>

          </div>

          <div className="w-full xl:w-auto mt-8">
            <div className="flex flex-col gap-3 items-stretch xl:items-end">
              <ContactInfo variant="hero" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}