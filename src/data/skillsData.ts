import { SkillCategory } from '@/lib/resume/types'

export const skillsData: SkillCategory[] = [
  {
    category: 'coreTitle',
    side: 'left',
    groups: [
      {
        groupName: 'Frontend',
        skills: [
          'React 18',
          'Next.js (App Router, SSR/ISR)',
          'TypeScript',
          'Zustand, Redux Toolkit, SWR',
          'Forms, validation, error handling, server-driven UI',
        ],
      },
      {
        groupName: 'Architecture',
        skills: [
          'Feature-Sliced Design (FSD)',
          'Modular architecture, separation of concerns',
          'Server-first data flows, caching & loading strategies',
        ],
      },
    ],
  },
  {
    category: 'tgTitle',
    side: 'left',
    groups: [
      {
        groupName: 'UI & Styling',
        skills: [
          'Tailwind CSS',
          'MUI',
          'Styled Components',
          'Responsive layouts',
          'Lightweight design systems',
          'Data visualisation (ApexCharts)',
        ],
      },
    ],
  },
  {
    category: 'toolTitle',
    side: 'right',
    groups: [
      {
        groupName: 'Backend',
        skills: [
          'NestJS',
          'Laravel',
          'REST APIs',
          'Webhooks',
          'Background jobs',
        ],
      },
      {
        groupName: 'Integrations',
        skills: [
          'Keitaro API',
          'Telegram Web Apps',
        ],
      },
    ],
  },
  {
    category: 'otherTitle',
    side: 'right',
    groups: [
      {
        groupName: 'Testing & Quality',
        skills: [
          'Jest',
          'React Testing Library',
          'Storybook',
          'ESLint',
          'Prettier',
          'Strict TypeScript',
          'Lighthouse (perf & a11y basics)',
        ],
      },
      {
        groupName: 'DevOps & Process',
        skills: [
          'Docker',
          'Git',
          'GitLab CI/CD',
          'GitHub/GitLab Flow',
          'Code review',
          'Agile/Scrum',
          'Product mindset',
        ],
      },
    ],
  },
]