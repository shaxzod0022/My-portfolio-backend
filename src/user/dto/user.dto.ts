import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  description: string;
}
