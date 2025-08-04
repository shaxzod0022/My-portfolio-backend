import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin, AdminDocument } from "./admin.schema";
import { AdminDto, LoginDto } from "./dto/admin.dto.ts/admin.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService
  ) {}

  async getAll() {
    return this.adminModel.find();
  }

  async create(dto: AdminDto) {
    const candidate = await this.adminModel.findOne({ email: dto.email });
    if (candidate) {
      throw new UnauthorizedException("Bunday email allaqachon mavjud");
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = new this.adminModel({ ...dto, password: hashedPassword });
    await admin.save();
    return { message: "Admin yaratildi" };
  }

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException("Email topilmadi");
    }

    const isPassValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPassValid) {
      throw new UnauthorizedException("Noto‘g‘ri parol");
    }

    const token = await this.jwtService.signAsync({
      id: admin._id,
      email: admin.email,
    });

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
      },
    };
  }

  async update(
    id: string,
    dto: Partial<AdminDto> & { currentPassword: string; password?: string }
  ) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("Admin topilmadi");
    }

    const isPassValid = await bcrypt.compare(
      dto.currentPassword,
      admin.password
    );
    if (!isPassValid) {
      throw new UnauthorizedException("Parol noto‘g‘ri");
    }

    const updateData: any = { ...dto };

    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(dto.password, salt);
    }

    delete updateData.currentPassword;

    return this.adminModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string, password: string) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    const isPassValid = await bcrypt.compare(password, admin.password);
    if (!isPassValid) {
      throw new UnauthorizedException("Parol noto‘g‘ri");
    }

    return this.adminModel.findByIdAndDelete(id);
  }
}
