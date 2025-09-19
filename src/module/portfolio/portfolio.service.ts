// src/portfolio/portfolio.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Portfolio } from "./schemas/portfolio.schema";
import { CreatePortfolioDto } from "./dto/portfolio.dto";

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>
  ) {}

  async create(dto: CreatePortfolioDto): Promise<Portfolio> {
    const created = new this.portfolioModel(dto);
    return created.save();
  }

  async findAll(lang?: string): Promise<any[]> {
    const portfolios = await this.portfolioModel.find().exec();

    // agar til tanlansa faqat shu tarjimani qaytaradi
    if (lang) {
      return portfolios.map((p) => ({
        _id: p._id,
        title: p.translations[lang]?.title || p.translations["uz"].title,
        description:
          p.translations[lang]?.description || p.translations["uz"].description,
        images: p.images,
        projectLink: p.projectLink,
        reposLink: p.reposLink,
      }));
    }

    return portfolios;
  }

  async findOne(id: string, lang?: string): Promise<any> {
    const portfolio = await this.portfolioModel.findById(id).exec();
    if (!portfolio) throw new NotFoundException("Portfolio not found");

    if (lang) {
      return {
        _id: portfolio._id,
        title:
          portfolio.translations[lang]?.title ||
          portfolio.translations["uz"].title,
        description:
          portfolio.translations[lang]?.description ||
          portfolio.translations["uz"].description,
        images: portfolio.images,
        projectLink: portfolio.projectLink,
        reposLink: portfolio.reposLink,
      };
    }

    return portfolio;
  }
}
