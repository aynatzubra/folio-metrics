'use client'

import { useEffect, useRef } from 'react'

export function useSectionObserver() {
  const activeSectionRef = useRef<string>('hero') // start from 'hero'
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            activeSectionRef.current = entry.target.id
          }
        })
      },
      {
        threshold: 0.3, // 30%
      },
    )

    // start monitoring all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    // will send data when the page is closed
    const sendAnalyticsData = () => {
      const duration = Date.now() - startTimeRef.current
      const data = {
        sectionId: activeSectionRef.current,
        duration,
      }

      // reliably sends data even when the tab is closed
      navigator.sendBeacon('/api/track-visit', JSON.stringify(data))
    }

    // add page unload event listener
    window.addEventListener('beforeunload', sendAnalyticsData)

    // cleaning up when unmounting a component
    return () => {
      window.removeEventListener('beforeunload', sendAnalyticsData)
      observer.disconnect()
    }
  }, [])
}
