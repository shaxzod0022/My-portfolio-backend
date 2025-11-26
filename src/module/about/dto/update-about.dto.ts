import { IsString, ValidateNested } from "class-validator";
import { TranslationAboutDto } from "./transition.dto";
import { Type } from "class-transformer";

class TranslationsAboutDto {
  @ValidateNested()
  @Type(() => TranslationAboutDto)
  uz: TranslationAboutDto;

  @ValidateNested()
  @Type(() => TranslationAboutDto)
  ru: TranslationAboutDto;

  @ValidateNested()
  @Type(() => TranslationAboutDto)
  en: TranslationAboutDto;
}

export class UpdateAboutDto {
  @ValidateNested()
  @Type(() => TranslationsAboutDto)
  trDes: TranslationsAboutDto;

  @ValidateNested()
  @Type(() => TranslationsAboutDto)
  trTitle: TranslationsAboutDto;

  @IsString()
  images: string;
}
