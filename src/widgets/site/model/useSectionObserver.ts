'use client'

import { useEffect, useRef } from 'react'

import { usePathname } from '@/shared/lib/i18n/navigation'
import { useAnalytics } from '@/shared/api'

export function useSectionObserver() {
  const pathname = usePathname()
  const { trackSectionVisit } = useAnalytics()

  const activeSectionRef = useRef<string>('hero')
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const sendSectionDuration = (sectionId: string, duration: number) => {
      trackSectionVisit({ sectionId, duration })
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSection = entry.target.id

            if (newSection !== activeSectionRef.current) {
              const now = Date.now()
              const duration = now - startTimeRef.current

              sendSectionDuration(activeSectionRef.current, duration)

              const newHash = newSection === 'hero' ? '' : `#${newSection}`
              window.history.replaceState(null, '', `${window.location.pathname}${newHash}`)

              activeSectionRef.current = newSection
              startTimeRef.current = now
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

    const sendAnalyticsData = () => {
      const duration = Date.now() - startTimeRef.current
      sendSectionDuration(activeSectionRef.current, duration)
    }

    // cleaning up when unmounting a component
    return () => {
      window.removeEventListener('beforeunload', sendAnalyticsData)
      observer.disconnect()
    }
  }, [pathname, trackSectionVisit])
}
