import dynamic from 'next/dynamic'

import { Hero } from '../../sections'

const Intro = dynamic(() => import('../../sections').then(m => m.Intro))
const TechnicalSkills = dynamic(() => import('../../sections').then(m => m.TechnicalSkills))
const Experience = dynamic(() => import('../../sections').then(m => m.Experience))
const Education = dynamic(() => import('../../sections').then(m => m.Education))
const Additional = dynamic(() => import('../../sections').then(m => m.Additional))

export const LANDING_SECTIONS = [
  { id: 'hero', Component: Hero },
  { id: 'intro', Component: Intro },
  { id: 'skills', Component: TechnicalSkills },
  { id: 'experience', Component: Experience },
  { id: 'education', Component: Education },
  { id: 'adds', Component: Additional },
] as const