'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ContactInfo from '@/components/common/ContactInfo'

import myAva from '../../../public/assets/images/0my_ava.png'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <div
      className="w-full lg:h-[calc(100vh-70px)] min-h-full relative flex flex-col lg:flex-row">
      <div className="pointer-events-none absolute inset-0 hidden lg:flex">
        <div className="h-full w-1/2 bg-[#FBE1D0]" />
        <div className="h-full w-1/2 bg-white" />
      </div>

      <div className="w-full z-10 max-w-[1276px] mx-auto flex flex-col lg:flex-row">
        {/* Left */}
        <div
          className="
             w-full
             flex items-center justify-center
             pt-[1.75rem] px-[1.75rem]
             lg:bg-[#FBE1D0] lg:flex-[0_0_30%] lg:pt-[4.375rem] lg:pb-[1.6625rem]
             md:pt-[3.15rem] md:pb-[0] md:px-[3.5rem]
         "
        >
          {/*/!*Avatar Image*!/*/}
          <Image
            src={myAva}
            alt="My photo"
            width={224}
            height={224}
            className="
                rounded-full
                object-cover
                lg:w-60 lg:h-60
                w-40 sm:w-48 lg:w-56 mt-[2rem]
                lg:mt-[-5.8rem]
                sm:w-[14rem]
                bg-gradient-to-b from-[#F67769] to-[#FBE1D0]
            "
          />
        </div>

        {/* Right */}
        <div
          className="bg-[#FFFFFF] pt-[1.75rem] px-[1.75rem]
              flex flex-col flex-1 lg:justify-between
              lg:pt-[4.375rem] lg:pb-[1.6625rem]
              md:pt-[1.75rem] md:pb-[1.4rem] md:px-[3.5rem]">
          <div
            className="flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-center lg:flex-1 mb-[1rem] md:mb-[1.75rem]">
            {/* Role */}
            <p className="text-sm tracking-wide text-[#4B5563] mb-3">
              [{t('role')}]
            </p>
            {/* Name */}
            <h1
              className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] sm:text-4xl md:text-5xl font-bold tracking-[0.18em] text-[#F67769] uppercase">
              {t('name')}
            </h1>
            {/* Description */}
            <p className="mt-6 max-w-2xl text-[0.875rem] leading-relaxed text-[#4B5563]">
              {t('shortText')}
            </p>
          </div>

          {/* Information Block */}
          <div className="w-full">
            <hr className="w-full border-t border-2 border-[#FF7814] mb-8" />
            <ContactInfo />
          </div>
        </div>

      </div>
    </div>
  )
}