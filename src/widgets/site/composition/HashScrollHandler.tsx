'use client'

import { useEffect } from 'react'

export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash)

        if (element) {
           element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [])

  return null
}