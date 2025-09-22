import { Types } from "mongoose";
import { TranslationDto } from "./translation.dto";

export class LinkResponseDto {
  _id!: string;
  linkName!: string;
  linkPathname!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export interface LinkFullLanguage {
  _id: string;
  translations: {
    uz: { linkName: string };
    ru: { linkName: string };
    en: { linkName: string };
  };
  linkPathname: string;
  createdAt: string;
  updatedAt: string;
}
