import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Portfolio, PortfolioDocument } from "./portfolio.schema";
import { Model } from "mongoose";
import { PortfolioDto } from "./dto/portfolio.dto";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>
  ) {}

  async getAll() {
    return this.portfolioModel.find();
  }

  async create(dto: PortfolioDto, imagePath: string[]) {
    const created = new this.portfolioModel({
      ...dto,
      images: imagePath,
    });

    return created.save();
  }

  async update(id: string, dto: Partial<PortfolioDto>) {
    const existing = await this.portfolioModel.findById(id);
    if (!existing) {
      throw new NotFoundException("Portfolio topilmadi");
    }

    if (dto.images && Array.isArray(dto.images)) {
      const oldImages = existing.images;
      const newImages = dto.images;

      oldImages.forEach((img) => {
        if (!newImages.includes(img)) {
          const filePath = path.join(__dirname, "..", "..", "uploads", img);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }

    return this.portfolioModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<any> {
    const portfolio = await this.portfolioModel.findById(id);
    if (!portfolio) {
      throw new NotFoundException("Portfolio topilmadi");
    }

    portfolio.images.forEach((filename) => {
      const filePath = path.join(__dirname, "..", "..", "uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // faylni o'chirish
      }
    });

    return this.portfolioModel.findByIdAndDelete(id);
  }
}
