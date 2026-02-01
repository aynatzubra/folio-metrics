export interface ExperienceItemType {
  company: string
  period: string
  role: string
  about: string
  stack: string[]
  description: string
  result: string
}

//Technical Skills
export type TechnicalSkillsCategoryKey =
  | 'coreTitle'
  | 'tgTitle'
  | 'toolTitle'
  | 'otherTitle'

export type SkillGroup = {
  groupName: string
  skills: string[]
}

export type SkillCategory = {
  category: TechnicalSkillsCategoryKey
  groups: SkillGroup[]
}
