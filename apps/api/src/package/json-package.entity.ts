import { User } from "@app/user/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JsonPackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  version: string;

  @ManyToMany(() => User, (user) => user.jsonPackages, {
    cascade: true,
    onDelete: "CASCADE",
  })
  users: User[];
}
