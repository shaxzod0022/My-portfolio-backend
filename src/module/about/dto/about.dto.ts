import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Locale } from "./create-about.dto";

export class AboutDto {
  @IsObject()
  @IsNotEmpty()
  trDes!: Record<Locale, { description: string }>;

  @IsObject()
  @IsNotEmpty()
  trTitle!: Record<Locale, { title: string }>;

  @IsString()
  @IsNotEmpty()
  image!: string;
}
