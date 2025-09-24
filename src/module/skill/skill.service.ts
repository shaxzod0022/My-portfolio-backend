import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Locale, Skill } from "./schemas/skill.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SkillDto } from "./dto/skill.dto";
import {
  SkillFullLanguage,
  SkillResponseDto,
  SkillUpdateResponse,
} from "./dto/response-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async create(dto: SkillDto, lang: Locale = "uz"): Promise<SkillResponseDto> {
    const exists = await this.skillModel
      .findOne({ skillIcon: dto.skillIcon })
      .lean()
      .exec();
    if (exists) {
      throw new ConflictException("Skill icon already exists");
    }
    const created = new this.skillModel(dto);
    const saved = await created.save();
    return {
      _id: saved._id.toString(),
      skillName:
        saved.translations![lang]?.skillName ||
        saved.translations!["uz"].skillName,
      skillIcon: saved.skillIcon,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  async findFullLang(id: string): Promise<SkillFullLanguage> {
    const doc = await this.skillModel.findById(id).lean().exec();
    if (!doc) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }
    return {
      _id: doc._id.toString(),
      translations: doc.translations,
      skillIcon: doc.skillIcon,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  async findAll(
    lang?: Locale,
    page = 1,
    limit = 10
  ): Promise<SkillResponseDto[]> {
    const skip = (page - 1) * limit;
    const docs = await this.skillModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return docs.map((d) => ({
      _id: d._id.toString(),
      skillIcon: d.skillIcon,
      skillName:
        d.translations?.[lang || "uz"]?.skillName ??
        d.translations?.["uz"]?.skillName ??
        "",
      createdAt: d.createdAt!,
      updatedAt: d.updatedAt!,
    }));
  }

  async update(
    id: string,
    dto: UpdateSkillDto,
    lang: Locale
  ): Promise<SkillUpdateResponse> {
    const updated = await this.skillModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true, lean: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    return {
      _id: updated._id.toString(),
      skillName:
        updated.translations![lang || "uz"]?.skillName ||
        updated.translations!["uz"].skillName,
      skillIcon: updated.skillIcon,
      createdAt: updated.createdAt!.toString(),
      updatedAt: updated.updatedAt!.toString(),
    };
  }

  async delete(id: string): Promise<SkillResponseDto> {
    const deleted = await this.skillModel.findByIdAndDelete(id).lean();
    if (!deleted) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
    return {
      _id: deleted._id.toString(),
      skillName: deleted.translations?.["uz"].skillName ?? "",
      skillIcon: deleted.skillIcon,
      createdAt: deleted.createdAt,
      updatedAt: deleted.updatedAt,
    };
  }
}
