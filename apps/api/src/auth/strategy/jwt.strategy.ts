import { authConfig, AuthConfigType } from "@app/auth/auth.config";
import { AuthService } from "@app/auth/auth.service";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @Inject(authConfig.KEY) config: AuthConfigType,
    private readonly authService: AuthService
  ) {
    const options: StrategyOptions = {
      jwtFromRequest,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.jwksUri}.well-known/jwks.json`,
      }),
      passReqToCallback: true,
    };
    super(options);
  }

  async validate(req: Request, payload: JwtPayload) {
    const token = jwtFromRequest(req);

    console.log(token);
    return this.authService.authenticate(payload, token);
  }
}
