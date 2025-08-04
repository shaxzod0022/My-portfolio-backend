import { IsNotEmpty } from "class-validator";

export class ContactDto {
  @IsNotEmpty()
  link: string;
  @IsNotEmpty()
  linkName: string;
  description: string;
}
