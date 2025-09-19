import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto, LoginDto } from "./dto/admin.dto.ts/admin.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAll() {
    return this.adminService.getAll();
  }

  @Post("register")
  async register(@Body() dto: AdminDto) {
    return this.adminService.create(dto);
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.adminService.login(dto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<AdminDto> & { currentPassword: string }
  ) {
    return this.adminService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Body() body: { password: string }) {
    return this.adminService.delete(id, body.password);
  }
}
