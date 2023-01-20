import { JsonPackageEntity } from "@app/package/json-package.entity";
import { Rating } from "@app/rating/rating.entity";
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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  @JoinColumn()
  ratings: Rating[];

  @ManyToMany(() => JsonPackageEntity, (jsonPackage) => jsonPackage.users)
  @JoinColumn()
  jsonPackages: JsonPackageEntity[];
}
