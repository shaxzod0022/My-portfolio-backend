import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { TranslationSkillDto } from "./translation.dto";

export type Locale = "uz" | "ru" | "en";

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  skillIcon: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationSkillDto)
  translations: {
    uz: TranslationSkillDto;
    ru?: TranslationSkillDto;
    en?: TranslationSkillDto;
  };
}
