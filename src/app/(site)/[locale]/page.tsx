import dynamic from 'next/dynamic'

import SiteHeader from '@/components/layout/SiteHeader'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import PageObserver from '@/components/common/PageObserver'

const TechnicalSkills = dynamic(() => import('@/components/sections/TechnicalSkills'))
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Education = dynamic(() => import('@/components/sections/Education'))
const Additional = dynamic(() => import('@/components/sections/Additional'))
const Footer = dynamic(() => import('@/components/layout/SiteFooter'))

export default function LandingPage() {
  return (
    <div className="bg-white w-full relative text-gray-800">
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
    </div>
  )
}
