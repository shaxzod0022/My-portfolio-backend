import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AboutDocument = HydratedDocument<About>;
export type Locale = "uz" | "ru" | "en";

@Schema({ _id: false })
export class Translations {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

const TranslationSchema = SchemaFactory.createForClass(Translations);

@Schema({ _id: true, timestamps: true })
export class About {
  @Prop({
    type: {
      uz: { type: TranslationSchema },
      ru: { type: TranslationSchema },
      en: { type: TranslationSchema },
    },
    _id: false,
    required: true,
  })
  trTitle: Record<Locale, Translations>;

  @Prop({
    type: {
      uz: { type: TranslationSchema },
      ru: { type: TranslationSchema },
      en: { type: TranslationSchema },
    },
    _id: false,
    required: true,
  })
  trDes: Record<Locale, Translations>;

  @Prop({ required: true })
  image: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AboutSchema = SchemaFactory.createForClass(About);
