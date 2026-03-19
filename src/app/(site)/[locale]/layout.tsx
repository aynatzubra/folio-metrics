import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import type { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: {
      default: 'Frontend-oriented Full-Stack Engineer | React · Next.js · TS · NestJs',
      template: '%s | Tanya Arbuz',
    },
    description: t('description'),
    metadataBase: new URL('https://www.arbuz.buzz'),

    openGraph: {
      title: 'Tatiana Arbuz - Systems-Minded Engineer',
      description: t('description'),
      url: 'https://www.arbuz.buzz',
      siteName: 'Tatiana Arbuz',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/assets/images/og-image.webp',
          width: 1200,
          height: 630,
          alt: 'Tatiana Arbuz Folio Metrics',
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.arbuz.buzz/${locale}`,
      languages: {
        'en-US': '/en',
        'ru-RU': '/ru',
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    keywords: [
      'Frontend Engineer',
      'React',
      'Next.js',
      'TypeScript',
      'Feature-Sliced Design',
      'Full Stack Engineer',
    ],
  }
}

export default async function SiteRootLayout({ children, params }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
