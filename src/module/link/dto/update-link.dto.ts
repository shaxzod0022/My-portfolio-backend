import { Type } from "class-transformer";
import { ValidateNested, IsString } from "class-validator";

class TranslationDto {
  @IsString()
  linkName: string;
}

class TranslationsDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  uz: TranslationDto;

  @ValidateNested()
  @Type(() => TranslationDto)
  ru: TranslationDto;

  @ValidateNested()
  @Type(() => TranslationDto)
  en: TranslationDto;
}

export class UpdateLinkDto {
  @ValidateNested()
  @Type(() => TranslationsDto)
  translations: TranslationsDto;

  @IsString()
  linkPathname: string;
}
