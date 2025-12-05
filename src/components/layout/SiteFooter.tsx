'use client'

import { useTranslations } from 'next-intl'

import ContactInfo from '@/components/common/ContactInfo'

export default function SiteFooter() {
  const t = useTranslations('Footer')

  return (
    <footer id="contact" className="w-full bg-[#FBE1D0] text-center py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg text-[#F67769] font-bold uppercase inline-block px-6 pt-3">
          {t('finalWords')}
        </h2>

        {/*Social Buttons*/}
        <div className="flex justify-center items-start space-x-4 mb-8">
          <ContactInfo />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Tatiana.Arbuz. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
