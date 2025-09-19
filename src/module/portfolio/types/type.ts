// src/portfolio/types.ts
import { Document, Types } from "mongoose";

export type Translation = {
  title: string;
  description: string;
};

export type TranslationsMap = Record<string, Translation>;

export interface IPortfolio {
  _id?: Types.ObjectId;
  translations: TranslationsMap;
  images: string[];
  projectLink: string;
  reposLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PortfolioDocument = IPortfolio & Document;
