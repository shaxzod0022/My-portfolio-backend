import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAll() {
    return this.contactService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.contactService.getById(id);
  }

  @Post()
  async create(@Body() dto: ContactDto) {
    return this.contactService.create(dto);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: ContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.contactService.delete(id);
  }
}
