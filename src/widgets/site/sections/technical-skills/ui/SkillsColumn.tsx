import { useTranslations } from 'next-intl'

import type { SkillCategory } from '.././model/types'

export function SkillsColumn({
                               categories,
                               t,
                             }: {
  categories: SkillCategory[]
  t: ReturnType<typeof useTranslations>
}) {
  return (
    <div className="space-y-12">
      {categories.map((category, index) => (
        <section key={category.key} className="group">
          <h3 className="mb-2 text-lg font-[Inter] font-medium tracking-wide text-accent">
            {t(`categories.${category.key}`)}
          </h3>

          <div className="py-1 first:pt-0 last:pb-0">
            <div className="mt-1 text-base leading-relaxed text-gray-600">
              {category.stack.join(', ')}
            </div>
          </div>

        </section>
      ))}
    </div>
  )
}