import { DatabaseModule } from "@app/database/database.module";
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { PackageController } from "./package/package.controller";
import { UserModule } from "./user/user.module";
import { PackageModule } from "./package/package.module";
import { RatingModule } from "./rating/rating.module";
import { AuthModule } from "@app/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    DatabaseModule,
    UserModule,
    PackageModule,
    RatingModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
