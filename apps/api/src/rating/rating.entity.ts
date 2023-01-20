import { JsonPackageEntity } from "@app/package/json-package.entity";
import { User } from "@app/user/user.entity";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { Reaction } from "./rating.dto";

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json", nullable: true })
  reactions: Reaction[];

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => JsonPackageEntity, (jsonPackage) => jsonPackage.users)
  jsonPackage: JsonPackageEntity;
}
