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
import { SkillService } from "./skill.service";
import { SkillDto } from "./dto/skill.dto";
import { Locale } from "./schemas/skill.schema";
import {
  SkillFullLanguage,
  SkillResponseDto,
  SkillUpdateResponse,
} from "./dto/response-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Controller("skills")
export class SkillController {
  constructor(private readonly linkService: SkillService) {}

  // POST /links
  @Post()
  async create(
    @Body() dto: SkillDto,
    @Query("lang") lang: Locale = "uz"
  ): Promise<SkillResponseDto> {
    return this.linkService.create(dto, lang);
  }

  // GET /links?page=1&limit=10&lang=ru
  @Get()
  async findAll(
    @Query("lang") lang?: Locale,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<SkillResponseDto[]> {
    return this.linkService.findAll(lang, Number(page), Number(limit));
  }

  @Get(":id")
  async findFullLang(@Param("id") id: string): Promise<SkillFullLanguage> {
    return this.linkService.findFullLang(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateSkillDto,
    @Query("lang") lang: Locale = "uz"
  ): Promise<SkillUpdateResponse> {
    return this.linkService.update(id, dto, lang);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<SkillResponseDto> {
    return this.linkService.delete(id);
  }
}
