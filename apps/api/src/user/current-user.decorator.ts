import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!!req.user) return !!data ? req.user[data] : req.user;

    throw new UnauthorizedException();
  }
);
