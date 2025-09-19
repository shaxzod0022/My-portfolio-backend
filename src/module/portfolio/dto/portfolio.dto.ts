// src/portfolio/dto/create-portfolio.dto.ts
import { IsNotEmpty, IsObject, IsUrl, IsArray } from "class-validator";

class TranslationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class CreatePortfolioDto {
  @IsObject()
  translations: {
    uz: TranslationDto;
    ru?: TranslationDto;
    en?: TranslationDto;
  };

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsUrl()
  projectLink: string;

  @IsUrl()
  reposLink: string;
}
