// src/portfolio/schemas/portfolio.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false })
class Translation {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

@Schema({ timestamps: true })
export class Portfolio extends Document {
  @Prop({ type: Object, required: true })
  translations: {
    uz: Translation;
    ru?: Translation;
    en?: Translation;
  };

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ required: true })
  projectLink: string;

  @Prop({ required: true })
  reposLink: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
