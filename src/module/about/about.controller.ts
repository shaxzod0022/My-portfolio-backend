import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AboutService } from "./about.service";
import { CreateAboutDto } from "./dto/create-about.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("about")
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/about",
        filename: (req, file, cb) => {
          const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async create(
    @Body() dto: CreateAboutDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.aboutService.create(dto, file?.filename);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.aboutService.remove(id);
  }
}
