import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogModule } from "./blog/blog.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ContactModule } from "./contact/contact.module";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
