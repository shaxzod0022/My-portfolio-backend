import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./module/admin/admin.module";
import { PortfolioModule } from "./module/portfolio/portfolio.module";
import { UserModule } from "./module/user/user.module";
import { BlogModule } from "./module/blog/blog.module";
import { ContactModule } from "./module/contact/contact.module";
import { SkillModule } from "./module/skill/skill.module";
import { LinkModule } from "./module/link/link.module";
import { SkillController } from "./module/skill/skill.controller";
import { LinkController } from "./module/link/link.controller";
import { SkillService } from "./module/skill/skill.service";
import { LinkService } from "./module/link/link.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    PortfolioModule,
    UserModule,
    BlogModule,
    ContactModule,
    SkillModule,
    LinkModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
