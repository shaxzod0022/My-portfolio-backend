import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { TranslationAboutDto } from "./transition.dto";

export type Locale = "uz" | "ru" | "en";
export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationAboutDto)
  trDes: {
    uz: TranslationAboutDto;
    ru?: TranslationAboutDto;
    en?: TranslationAboutDto;
  };
  @IsObject()
  @ValidateNested()
  @Type(() => TranslationAboutDto)
  trTitle: {
    uz: TranslationAboutDto;
    ru?: TranslationAboutDto;
    en?: TranslationAboutDto;
  };
}
