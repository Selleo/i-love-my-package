import { JsonPackageEntity } from "@app/package/json-package.entity";
import { User } from "@app/user/user.entity";
import { Injectable } from "@nestjs/common";
import { Reaction } from "./rating.dto";
import { Rating } from "./rating.entity";

@Injectable()
export class RatingService {
  getByPackageId(
    jsonPackage: JsonPackageEntity,
    user: User
  ): Promise<Rating | null> {
    return Rating.findOne({
      where: {
        jsonPackage: {
          id: jsonPackage.id,
        },
      },
      relations: {
        user: true,
        jsonPackage: true,
      },
    });
  }

  async add(
    currentUser: User,
    packageId: number,
    reactions: Reaction[] = []
  ): Promise<Rating> {
    const jsonPackage = await JsonPackageEntity.findOneOrFail({
      where: { id: packageId },
    });

    const newRating = Rating.create({
      ...currentUser,
      ...jsonPackage,
      reactions,
    });

    return newRating.save();
  }

  update(rating: Rating, reactions: Reaction[]): Promise<Rating> {
    return Rating.save({ ...rating, reactions });
  }
}
