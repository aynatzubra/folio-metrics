import { getTranslations } from 'next-intl/server'

import { ContactInfo } from '../../contact'

export async function SiteFooter() {
  const t = await getTranslations('Footer')

  return (
    <footer id="contact" className="w-full bg-gradient-to-br from-[#0b363d] via-[#0a2e33] to-[#071f23] py-12 px-6">
      <div className="mx-auto max-w-[1276px] text-center">
        <h2 className="text-lg font-semibold uppercase tracking-widest text-white/80">
          {t('finalWords')}
        </h2>

        <ContactInfo variant="footer" className="mt-8" />

        <p className="mt-10 text-xs text-white/70 opacity-50">
          © {new Date().getFullYear()} Tatiana Arbuz. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
