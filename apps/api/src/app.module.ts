import { DatabaseModule } from "@app/database/database.module";
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { PackageController } from "./package/package.controller";
import { UserModule } from "./user/user.module";
import { PackageModule } from "./package/package.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV ?? "production"}`, ".env"],
    }),
    DatabaseModule,
    UserModule,
    PackageModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
