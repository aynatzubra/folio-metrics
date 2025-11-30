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
export interface SkillGroup {
  groupName: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  side: 'left' | 'right';
  groups: SkillGroup[];
}