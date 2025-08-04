import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Contact, ContactDocument } from "./contact.schema";
import { ContactDto } from "./dto/contact.dto";
import { Model } from "mongoose";

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>
  ) {}

  async getAll() {
    return this.contactModel.find();
  }

  async getById(id: string) {
    return this.contactModel.findOne({ _id: id });
  }

  async create(dto: ContactDto) {
    return this.contactModel.create(dto);
  }

  async update(id: string, dto: ContactDto) {
    return this.contactModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.contactModel.findByIdAndDelete(id);
  }
}
