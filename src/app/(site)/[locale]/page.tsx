import dynamic from 'next/dynamic'

import { SiteHeader } from '@/widgets/site/layout'
import { Hero, Intro } from '@/widgets/site/sections'
import { FloatingActions, PageObserver } from '@/widgets/site/ui'

const TechnicalSkills = dynamic(
  () => import('@/widgets/site/sections').then((m) => m.TechnicalSkills),
)

const Experience = dynamic(
  () => import('@/widgets/site/sections').then((m) => m.Experience),
)

const Education = dynamic(
  () => import('@/widgets/site/sections').then((m) => m.Education),
)

const Additional = dynamic(
  () => import('@/widgets/site/sections').then((m) => m.Additional),
)

const Footer = dynamic(
  () => import('@/widgets/site/layout').then((m) => m.SiteFooter),
)

export default function LandingPage() {
  return (
    <div className="w-full relative text-gray-800">
      <PageObserver />
      <SiteHeader />
      <section id="hero">
        <Hero />
      </section>
      <section id="intro">
        <Intro />
      </section>
      <section id="skills">
        <TechnicalSkills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="adds">
        <Additional />
      </section>
      <Footer />
      <FloatingActions />
    </div>
  )
}
