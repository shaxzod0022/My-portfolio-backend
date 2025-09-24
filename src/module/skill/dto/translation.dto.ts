import { IsNotEmpty, IsString } from "class-validator";

export class TranslationSkillDto {
  @IsString()
  @IsNotEmpty()
  skillName: string;
}
