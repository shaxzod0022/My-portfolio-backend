import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  link: string;
  @Prop({ required: true })
  linkName: string;
  @Prop()
  description: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
