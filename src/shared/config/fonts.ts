import { Roboto_Slab, Roboto_Mono, Inter } from 'next/font/google'

export const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
})

export const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
})