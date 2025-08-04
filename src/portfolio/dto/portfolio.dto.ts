import { IsNotEmpty } from "class-validator";

export class PortfolioDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  projectLink: string;

  @IsNotEmpty()
  reposLink: string;
}
