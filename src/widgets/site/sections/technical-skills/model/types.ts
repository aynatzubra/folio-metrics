export type TechnicalSkillsCategoryKey =
  | 'interface'
  | 'flow'
  | 'rendering'
  | 'quality'

export type SkillCategory = {
  key: TechnicalSkillsCategoryKey
  stack: string[]
}