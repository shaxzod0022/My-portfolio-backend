import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { About, Locale } from "./schema/about.schema";
import { Model } from "mongoose";
import { AboutResponseDto } from "./dto/response-about.dto";
import { CreateAboutDto } from "./dto/create-about.dto";

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<About>) {}

  async create(
    dto: CreateAboutDto,
    image: string,
    lang: Locale = "uz"
  ): Promise<AboutResponseDto> {
    const created = new this.aboutModel({ ...dto, image });
    const saved = await created.save();
    return {
      _id: saved._id.toString(),
      title: saved.trTitle![lang]?.title || saved.trTitle!["uz"]?.title || "",
      description:
        saved.trDes![lang]?.description ||
        saved.trDes!["uz"]?.description ||
        "",
      image: saved.image,
      createdAt: saved.createdAt,
      updatedAt: saved.createdAt,
    };
  }

  async remove(id: string) {
    const result = await this.aboutModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException("About not found!");
    return { message: "Deleted successfully" };
  }
}
