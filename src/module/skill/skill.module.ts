import { Module } from "@nestjs/common";
import { SkillController } from "./skill.controller";
import { SkillService } from "./skill.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Skill, SkillSchema } from "./schemas/skill.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  exports: [SkillService],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
