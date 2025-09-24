import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SkillDocument = HydratedDocument<Skill>;
export type Locale = "uz" | "ru" | "en";

@Schema({ _id: false })
export class Translation {
  @Prop({ required: true })
  skillName: string;
}

const TranslationSchema = SchemaFactory.createForClass(Translation);

@Schema({ _id: true, timestamps: true })
export class Skill {
  @Prop({
    type: {
      uz: { type: TranslationSchema },
      ru: { type: TranslationSchema },
      en: { type: TranslationSchema },
    },
    required: true,
    _id: false,
  })
  translations: Record<Locale, Translation>;

  @Prop({ required: true, unique: true })
  skillIcon: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
