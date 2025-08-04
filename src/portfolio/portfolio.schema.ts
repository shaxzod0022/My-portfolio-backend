import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema()
export class Portfolio {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  images: string[];
  @Prop({ required: true })
  projectLink: string;
  @Prop({ required: true })
  reposLink: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
