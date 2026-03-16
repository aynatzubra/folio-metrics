import dynamic from 'next/dynamic'

import { SiteHeader } from '@/widgets/site/layout'

import { PageObserver } from './PageObserver'
import { FloatingActions } from './FloatingActions'
import { HashScrollHandler } from './HashScrollHandler'
import { LANDING_SECTIONS } from './model/sections-config'

const SiteFooter = dynamic(() => import('@/widgets/site/layout').then(m => m.SiteFooter))

export function LandingPage() {
  return (
    <div className="w-full relative text-gray-800">
      <PageObserver />
      <HashScrollHandler />
      <SiteHeader />
      <main>
        {LANDING_SECTIONS.map(({ id, Component }) => (
          <section
            key={id} id={id}
            className="scroll-mt-[70px]">
            <Component />
          </section>
        ))}
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
