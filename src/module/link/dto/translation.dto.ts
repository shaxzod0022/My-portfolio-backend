import { IsNotEmpty, IsString } from "class-validator";

export class TranslationDto {
  @IsString()
  @IsNotEmpty()
  linkName: string;
}
