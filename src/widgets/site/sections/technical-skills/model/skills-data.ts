import type { SkillCategory } from './../model/types'

export const skillsData: SkillCategory[] = [
  {
    key: 'interface',
    stack: ['React', 'Next.js (App Router, SSR/ISR)', 'TypeScript', 'Tailwind CSS', 'Feature-Sliced Design (FSD)'],
  },
  {
    key: 'flow',
    stack: ['Zustand', 'Context API', 'NestJS', 'Laravel', 'REST APIs', 'Webhooks'],
  },
  {
    key: 'rendering',
    stack: ['SSR', 'ISR', 'Dynamic Rendering', 'Core Web Vitals', 'Lazy loading'],
  },
  {
    key: 'quality',
    stack: ['Jest', 'RTL', 'Storybook', 'Docker', 'CI/CD (GitLab/GitHub Actions)'],
  },
]