import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.blogService.getAll();
  }

  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  async create(@Body() dto: BlogDto) {
    return this.blogService.create(dto);
  }

  @HttpCode(200)
  @Get(":slug")
  async getById(@Param("slug") slug: string) {
    return this.blogService.getById(slug);
  }

  @HttpCode(200)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: BlogDto) {
    return this.blogService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.blogService.delete(id);
  }
}
