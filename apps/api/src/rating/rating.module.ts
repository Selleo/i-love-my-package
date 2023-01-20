import { UserModule } from "@app/user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingController } from "./rating.controller";
import { Rating } from "./rating.entity";
import { RatingService } from "./rating.service";

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [TypeOrmModule.forFeature([Rating]), UserModule],
})
export class RatingModule {}
