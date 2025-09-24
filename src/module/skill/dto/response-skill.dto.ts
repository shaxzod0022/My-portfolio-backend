export class SkillResponseDto {
  _id!: string;
  skillName!: string;
  skillIcon!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export interface SkillFullLanguage {
  _id: string;
  translations: {
    uz: { skillName: string };
    ru: { skillName: string };
    en: { skillName: string };
  };
  skillIcon: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillUpdateResponse {
  _id: string;
  skillName: string;
  skillIcon: string;
  createdAt: string;
  updatedAt: string;
}
