export const metadata = {
  title: 'Admin Login | Folio-Metrics',
  description: 'Admin login for Folio-Metrics.',
  robots: { index: false, follow: false },
}

export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
