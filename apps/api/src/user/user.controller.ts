import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  login(@Body() { email }: CreateUserDto): Promise<User> {
    return this.userService.findOneByEmailOrCreate(email);
  }
}
