import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export enum ReacrtionType {
  redCard = "RED_CARD",
  yellowCard = "YELLOW_CARD",
  superLike = "SUPER_LIKE",
}

export type Reaction = {
  reactionType: ReacrtionType;
  comment?: string;
};

export class ReactionDto {
  @IsEnum(ReacrtionType)
  @IsNotEmpty()
  @IsString()
  reactionType: ReacrtionType;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  packageId: number;

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => ReactionDto)
  reactions?: Reaction[];
}
