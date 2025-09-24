import { IsNotEmpty, IsObject } from "class-validator";
import { Locale } from "./create-skill.dto";

export class SkillDto {
  @IsObject()
  translations!: Record<Locale, { linkName: string }>;

  @IsNotEmpty()
  skillIcon!: string;
}
