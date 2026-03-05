'use client'

import { useCallback, useEffect, useRef } from 'react'

import { usePathname } from '@/shared/lib/i18n/navigation'
import { useAnalytics } from '@/shared/api'

export function useSectionObserver() {
  const pathname = usePathname()
  const { trackSectionVisit } = useAnalytics()
  const activeSectionRef = useRef<string>('hero')
  const startTimeRef = useRef<number>(Date.now())

  const sendCurrentData = useCallback(() => {
    const duration = Date.now() - startTimeRef.current
    if (duration > 500) {
      trackSectionVisit({ sectionId: activeSectionRef.current, duration })
    }
  }, [trackSectionVisit])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSection = entry.target.id

            if (newSection !== activeSectionRef.current) {
              sendCurrentData()

              activeSectionRef.current = newSection
              startTimeRef.current = Date.now()

              const newHash = newSection === 'hero' ? '' : `#${newSection}`
              window.history.replaceState(null, '', `${window.location.pathname}${newHash}`)
            }
          }
        })
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      },
    )

    // start monitoring all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener('beforeunload', sendCurrentData)

    // cleaning up when unmounting a component
    return () => {
      window.removeEventListener('beforeunload', sendCurrentData)
      observer.disconnect()
    }
  }, [pathname, sendCurrentData])
}
