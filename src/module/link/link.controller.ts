import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { LinkService } from "./link.service";
import { LinkDto } from "./dto/link.dto";
import { LinkFullLanguage, LinkResponseDto } from "./dto/response-link.dto";
import { Locale } from "./schemas/link.schema";
import { UpdateLinkDto } from "./dto/update-link.dto";

@Controller("links")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // POST /links
  @Post()
  async create(
    @Body() dto: LinkDto,
    @Query("lang") lang: Locale = "uz"
  ): Promise<LinkResponseDto> {
    return this.linkService.create(dto, lang);
  }

  // GET /links?page=1&limit=10&lang=ru
  @Get()
  async findAll(
    @Query("lang") lang?: Locale,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<LinkResponseDto[]> {
    return this.linkService.findAll(lang, Number(page), Number(limit));
  }

  @Get(":id")
  async findFullLang(@Param("id") id: string): Promise<LinkFullLanguage> {
    return this.linkService.findFullLang(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateLinkDto
  ): Promise<LinkFullLanguage> {
    return this.linkService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<LinkResponseDto> {
    return this.linkService.delete(id);
  }
}
