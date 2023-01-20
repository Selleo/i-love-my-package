import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  async findOneByEmailOrCreate(email: string): Promise<User> {
    const user = await this.finsByEmail(email);
    if (user) return user;
    return this.create({ email });
  }

  create(user: CreateUserDto): Promise<User> {
    const newUser = User.create({ email: user.email });
    return newUser.save();
  }

  finsByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
    });
  }

  getById(userId: number) {
    return User.findOne({
      where: {
        id: userId,
      },
    });
  }
}
