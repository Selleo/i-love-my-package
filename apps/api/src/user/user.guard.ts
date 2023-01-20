import { User } from "@app/user/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const email = req.headers["authorization"];

    if (!email) return false;

    let user = await User.findOneBy({ email });
    if (!user) user = await User.create({ email }).save();

    req.user = user;

    return true;
  }
}
