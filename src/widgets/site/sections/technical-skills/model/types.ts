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