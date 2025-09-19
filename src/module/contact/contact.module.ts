import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, ContactSchema } from "./schemas/contact.schema";

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
})
export class ContactModule {}
