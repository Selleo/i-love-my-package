import { authConfig } from "@app/auth/auth.config";
import { AuthService } from "@app/auth/auth.service";
import { JwtGuard } from "@app/auth/guard/jwt.guard";
import { JwtStrategy } from "@app/auth/strategy/jwt.strategy";
import { UserModule } from "@app/user/user.module";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    HttpModule,
  ],
  providers: [JwtGuard, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
