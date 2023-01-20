import { User } from "@app/user/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class JsonPackageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text", { array: true, default: [] })
  versions: string[];

  @ManyToMany(() => User, (user) => user.jsonPackages, {
    cascade: true,
    onDelete: "CASCADE",
  })
  users: User[];
}
