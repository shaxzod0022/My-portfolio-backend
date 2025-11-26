import { IsNotEmpty, IsString } from "class-validator";

export class TranslationAboutDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
