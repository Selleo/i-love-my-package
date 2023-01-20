import { Body, Controller } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  login(@Body() { email }: CreateUserDto): Promise<User> {
    return this.userService.findOneByEmailOrCreate(email);
  }
}
