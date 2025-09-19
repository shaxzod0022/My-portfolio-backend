// src/portfolio/portfolio.controller.ts
import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { CreatePortfolioDto } from "./dto/portfolio.dto";

@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Get()
  async findAll(@Query("lang") lang?: string) {
    return this.portfolioService.findAll(lang);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Query("lang") lang?: string) {
    return this.portfolioService.findOne(id, lang);
  }
}
