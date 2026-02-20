import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Admin Login | Folio-Metrics',
  description: 'Admin login for Folio-Metrics.',
  robots: { index: false, follow: false },
}

export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
