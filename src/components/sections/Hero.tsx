'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import ContactInfo from '@/components/common/ContactInfo'

import myAva from '../../../public/assets/images/0my_ava.png'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <div className="relative w-full min-h-[calc(100vh-70px)] flex items-center">
      <div className="max-w-[1276px] mx-auto w-full px-6 md:px-14">

        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="flex-1">
            <h1
              className="text-[3rem] sm:text-[4rem] lg:text-[7rem] font-bold tracking-[0.05em] text-[#0b363d] uppercase leading-tight">
              Systems-minded<br />Engineer
            </h1>

            <div className="mt-12 flex items-center gap-4">
              <div className="w-16 h-16 overflow-hidden rounded-full border-3 border-accent">
                <Image
                  src={myAva}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  placeholder="blur"
                />
              </div>
              <Link
                href="#intro"
                className="text-lg font-medium group relative inline-block text-accent border-b border-accent/60 pb-2 transition-colors duration-150 ease-out hover:text-accent/85 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* {t('about_link')} */}
                More about me →
                <span
                  className="pointer-events-none absolute left-0 -bottom-0 h-[2px] w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100">
                </span>
              </Link>

            </div>
          </div>

          <div className="w-full lg:w-auto pt-[25px]">
            <div className="flex flex-col gap-3 items-stretch lg:items-end">
              <ContactInfo />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}