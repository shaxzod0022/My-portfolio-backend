import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { TranslationDto } from "./translation.dto";

export type Locale = "uz" | "ru" | "en";

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  linkPathname: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationDto)
  translations: {
    uz: TranslationDto;
    ru?: TranslationDto;
    en?: TranslationDto;
  };
}
