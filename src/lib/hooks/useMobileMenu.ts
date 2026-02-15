'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  useEffect(() => {
    close()
  }, [pathname, searchParams])

  useEffect(() => {
    const onHashChange = () => close()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) close()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isOpen, open, close }
}