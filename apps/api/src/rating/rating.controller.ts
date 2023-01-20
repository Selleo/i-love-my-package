import { CurrentUser } from "@app/user/current-user.decorator";
import { User } from "@app/user/user.entity";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateRatingDto } from "./rating.dto";
import { Rating } from "./rating.entity";
import { RatingService } from "./rating.service";

@Controller("ratings")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  addRating(
    @Body() { packageId, reactions }: CreateRatingDto,
    @CurrentUser() currentUser: User
  ): Promise<Rating> {
    return this.ratingService.add(currentUser, packageId, reactions);
  }
}
