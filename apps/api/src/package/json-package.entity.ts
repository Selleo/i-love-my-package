import { Rating } from "@app/rating/rating.entity";
import { Version } from "@app/package/json-package.type";
import { User } from "@app/user/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class JsonPackageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  versions: Version[];

  @ManyToMany(() => User, (user) => user.jsonPackages, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  users: User[];

  @OneToMany(() => Rating, (rating) => rating.jsonPackage)
  ratings: Rating[];
}
