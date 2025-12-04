'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function ContactInfo() {
  const t = useTranslations('Hero')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`

  const githubHref = 'https://github.com/aynatzubra'
  const telegramHref = 'https://t.me/tanya_arbuz'
  const linkedinHref = 'https://www.linkedin.com/in/tanya-arbuz'

  return (
    <div className="mt-6 mb-4 flex flex-wrap gap-3">
      {/* Download CV */}
      <Link
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className="inline-flex items-center justify-center rounded-sm bg-[#F67769] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-colors hover:bg-[#e1594f]"
      >
        {t('buttons.cv')}
      </Link>

      {/* GitHub */}
      <a
        href={githubHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-sm border border-[#F67769] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F67769] transition-colors hover:bg-[#FFF3EF]"
      >
        GitHub
      </a>

      {/* Telegram */}
      <a
        href={telegramHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-sm border border-[#F67769] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F67769] transition-colors hover:bg-[#FFF3EF]"
      >
        Telegram
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-sm border border-[#F67769] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F67769] transition-colors hover:bg-[#FFF3EF]"
      >
        LinkedIn
      </a>
      <a
        href="mailto:work.arbuz@gmail.com"
        target="_blank"
        className="inline-flex items-center justify-center rounded-sm border border-[#F67769] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F67769] transition-colors hover:bg-[#FFF3EF]"
      >
        Send mail
      </a>
    </div>
  )
}
