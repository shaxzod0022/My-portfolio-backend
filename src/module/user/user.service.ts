import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll() {
    return this.userModel.find();
  }

  async create(dto: UserDto) {
    return this.userModel.create(dto);
  }

  async getById(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async update(id: string, dto: UserDto) {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
