import { SkillCategory } from '@/lib/resume/types'

export const skillsData: SkillCategory[] = [
  {
    category: 'coreTitle',
    side: 'left',
    groups: [
      {
        groupName: 'Frontend',
        skills: [
          'React',
          'TypeScript',
          'Next.js (App Router, SSR/ISR)',
          'FSD',
          'Zustand',
          'Redux Toolkit',
          'Tailwind CSS',
          'MUI',
          'Styled Components',
          'Webpack/Vite',
        ],
      },
      {
        groupName: 'Backend',
        skills: ['NestJS', 'REST API', 'PostgreSQL', 'MariaDB', 'Redis'],
      },
      {
        groupName: 'Infrastructure & DevOps',
        skills: ['Docker', 'GitLab CI/CD', 'Cloudflare'],
      },
    ],
  },
  {
    category: 'tgTitle',
    side: 'left',
    groups: [
      {
        groupName: 'Telegram Ecosystem',
        skills: ['Telegram API', 'Grammy', 'Telegram Bots & Web Apps'],
      },
    ],
  },
  {
    category: 'toolTitle',
    side: 'right',
    groups: [
      {
        groupName: 'Tools',
        skills: ['Postman', 'TypeORM'],
      },
    ],
  },
  {
    category: 'otherTitle',
    side: 'right',
    groups: [
      { groupName: 'Frontend', skills: ['Vue.js'] },
      { groupName: 'Backend', skills: ['Laravel (PHP)'] },
    ],
  },
]