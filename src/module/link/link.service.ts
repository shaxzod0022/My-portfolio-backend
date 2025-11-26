import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Link, Locale } from "./schemas/link.schema";
import { Model } from "mongoose";
import { LinkDto } from "./dto/link.dto";
import {
  LinkFullLanguage,
  LinkResponseDto,
  LinkUpdate,
} from "./dto/response-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async create(dto: LinkDto, lang: Locale = "uz"): Promise<LinkResponseDto> {
    const exists = await this.linkModel
      .findOne({
        linkPathname: dto.linkPathname,
      })
      .lean()
      .exec();

    if (exists) {
      throw new ConflictException("Link pathname already exists!");
    }

    const created = new this.linkModel(dto);
    const saved = await created.save();

    return {
      _id: saved._id.toString(),
      linkName:
        saved.translations![lang]?.linkName ||
        saved.translations!["uz"].linkName,
      linkPathname: saved.linkPathname,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  // service
  async findFullLang(id: string): Promise<LinkFullLanguage> {
    const doc = await this.linkModel.findById(id).lean().exec();
    if (!doc) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
    return {
      _id: doc._id.toString(),
      translations: doc.translations,
      linkPathname: doc.linkPathname,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  async findAll(
    lang?: Locale,
    page = 1,
    limit = 10
  ): Promise<LinkResponseDto[]> {
    const skip = (page - 1) * limit;
    const docs = await this.linkModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return docs.map((d) => ({
      _id: d._id.toString(),
      linkPathname: d.linkPathname,
      linkName:
        d.translations?.[lang || "uz"]?.linkName ??
        d.translations?.["uz"]?.linkName ??
        "",
      createdAt: d.createdAt!,
      updatedAt: d.updatedAt!,
    }));
  }

  async update(
    id: string,
    dto: UpdateLinkDto,
    lang: Locale
  ): Promise<LinkUpdate> {
    const updated = await this.linkModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true, lean: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    return {
      _id: updated._id.toString(),
      linkName:
        updated.translations![lang || "uz"]?.linkName ||
        updated.translations!["uz"].linkName,
      linkPathname: updated.linkPathname,
      createdAt: updated.createdAt!.toString(),
      updatedAt: updated.updatedAt!.toString(),
    };
  }

  async delete(id: string): Promise<LinkResponseDto> {
    const deleted = await this.linkModel.findByIdAndDelete(id).lean();
    if (!deleted) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
    return {
      _id: deleted._id.toString(),
      linkName: deleted.translations?.["uz"].linkName ?? "",
      linkPathname: deleted.linkPathname,
      createdAt: deleted.createdAt,
      updatedAt: deleted.updatedAt,
    };
  }
}
