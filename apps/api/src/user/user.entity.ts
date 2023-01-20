import { JsonPackageEntity } from "@app/package/json-package.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  email: string;

  @ManyToMany(() => JsonPackageEntity, (jsonPackage) => jsonPackage.users)
  jsonPackages: JsonPackageEntity[];
}
