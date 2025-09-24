import { Type } from "class-transformer";
import { ValidateNested, IsString } from "class-validator";
import { TranslationSkillDto } from "./translation.dto";

class TranslationsSkillDto {
  @ValidateNested()
  @Type(() => TranslationSkillDto)
  uz: TranslationSkillDto;

  @ValidateNested()
  @Type(() => TranslationSkillDto)
  ru: TranslationSkillDto;

  @ValidateNested()
  @Type(() => TranslationSkillDto)
  en: TranslationSkillDto;
}

export class UpdateSkillDto {
  @ValidateNested()
  @Type(() => TranslationsSkillDto)
  translations: TranslationsSkillDto;

  @IsString()
  skillIcon: string;
}
