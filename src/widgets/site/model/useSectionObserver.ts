'use client'

import { useEffect, useRef } from 'react'

import { usePathname, useRouter } from '@/shared/lib/i18n/navigation'

export function useSectionObserver() {
  const router = useRouter()
  const pathname = usePathname()

  const activeSectionRef = useRef<string>('hero')
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const sendSectionDuration = (sectionId: string, duration: number) => {
      if (duration < 500) return
      navigator.sendBeacon(
        '/api/track-visit',
        JSON.stringify({
          sectionId,
          duration,
        }),
      )
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
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
        threshold: 0.6,
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
  }, [pathname, router])
}
