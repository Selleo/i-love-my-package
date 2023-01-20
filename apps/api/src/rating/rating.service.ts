import { JsonPackageEntity } from "@app/package/json-package.entity";
import { User } from "@app/user/user.entity";
import { UserService } from "@app/user/user.service";
import { Injectable } from "@nestjs/common";
import { Reaction } from "./rating.dto";
import { Rating } from "./rating.entity";

@Injectable()
export class RatingService {
  getByPackageId(packageId: number): Promise<Rating | null> {
    return Rating.findOneBy({
      jsonPackage: {
        id: packageId,
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

    const existingRating = await this.getByPackageId(packageId);
    if (!existingRating) {
      const newRating = Rating.create({
        ...currentUser,
        ...jsonPackage,
        ...reactions,
      });
      return newRating.save();
    }

    return this.update(existingRating, reactions);
  }

  update(rating: Rating, reactions: Reaction[]): Promise<Rating> {
    return Rating.save({ ...rating, reactions });
  }
}
