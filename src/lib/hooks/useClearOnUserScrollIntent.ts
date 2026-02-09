'use client'

import { useEffect, useState } from 'react'

const SCROLL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  ' ',
  'Spacebar',
])

type Options = {
  scrolledY?: number
  topResetY?: number
}

export function useNavActiveByClick(options: Options = {}) {
  const scrolledY = options.scrolledY ?? 10
  const topResetY = options.topResetY ?? 2

  const [activeHref, setActiveHref] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY

        setIsScrolled(y > scrolledY)

        if (y <= topResetY) {
          setActiveHref(null)
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrolledY, topResetY])

  useEffect(() => {
    if (!activeHref) return

    const clear = () => setActiveHref(null)

    const onWheel = () => clear()
    const onTouchMove = () => clear()
    const onKeyDown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) clear()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeHref])

  return { activeHref, setActiveHref, isScrolled }
}
