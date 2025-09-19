import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.userService.getById(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
