import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { PortfolioDto } from "./dto/portfolio.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { diskStorage } from "multer";

@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAll() {
    return this.portfolioService.getAll();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "images", maxCount: 5 }], {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${uuidv4()}${ext}`;
          cb(null, filename);
        },
      }),
    })
  )
  async createPortfolio(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: PortfolioDto
  ) {
    const imagePaths = files.images?.map((file) => file.filename) || [];
    return this.portfolioService.create(body, imagePaths);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: Partial<PortfolioDto>) {
    return this.portfolioService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.portfolioService.delete(id);
  }
}
