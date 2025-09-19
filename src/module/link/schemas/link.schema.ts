import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LinkDocument = HydratedDocument<Link>;
export type Locale = "uz" | "ru" | "en";

@Schema({ _id: false })
export class Translation {
  @Prop({ required: true })
  linkName: string;
}

const TranslationSchema = SchemaFactory.createForClass(Translation);

@Schema({ _id: true, timestamps: true })
export class Link {
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
  linkPathname: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
