import { IsNotEmpty, IsObject } from "class-validator";
import { Locale } from "../schemas/link.schema";

export class LinkDto {
  @IsObject()
  translations!: Record<Locale, { linkName: string }>;

  @IsNotEmpty()
  linkPathname!: string;
}
