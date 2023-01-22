import { authConfig, AuthConfigType } from "@app/auth/auth.config";
import { UserService } from "@app/user/user.service";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: AuthConfigType,
    private readonly httpService: HttpService,
    private readonly userService: UserService
  ) {}

  async authenticate(payload: any, token: string | null) {
    const profile = await this.getUserProfile(token, payload);
    console.log(profile.data)

    const userData = {
      email: profile.data.email,
      externalId: payload.sub,
    };

    let user = await this.userService.findOne({
      where: { externalId: payload.sub },
    });
    if (!user) user = await this.userService.create(userData);

    return user;
  }

  async getUserProfile(token: string | null, payload: any) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.httpService.axiosRef.get<{ email: string }>(
      `${payload.iss}userinfo`,
      options
    );
  }
}
