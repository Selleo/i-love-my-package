import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }

    return null;
  }
);
