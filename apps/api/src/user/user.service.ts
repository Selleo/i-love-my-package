import { Injectable } from "@nestjs/common";
import { DeepPartial, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  async findOneByEmailOrCreate(email: string): Promise<User> {
    const user = await this.finsByEmail(email);
    if (user) return user;
    return this.create({ email });
  }

  create(entityLike: DeepPartial<User>): Promise<User> {
    const newUser = User.create(entityLike);
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

  findOne(options: FindOneOptions<User>){
    return User.findOne(options)
  }

  async update(user: User, userData: QueryDeepPartialEntity<User>) {
    await User.update(user.id, userData);
    return user.reload();
  }
}
