import dynamic from 'next/dynamic'

import { PageObserver } from '@/widgets/site/composition/PageObserver'
import { SiteHeader } from '@/widgets/site/layout'
import { LANDING_SECTIONS } from '@/widgets/site/model'
import { FloatingActions } from '@/widgets/site/composition/FloatingActions'

const SiteFooter = dynamic(() => import('@/widgets/site/layout').then(m => m.SiteFooter))

export function LandingPage() {
  return (
    <div className="w-full relative text-gray-800">
      <PageObserver />
      <SiteHeader />
      <main>
        {LANDING_SECTIONS.map(({ id, Component }) => (
          <section key={id} id={id}>
            <Component />
          </section>
        ))}
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
