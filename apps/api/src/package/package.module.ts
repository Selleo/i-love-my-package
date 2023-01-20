import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JsonPackageEntity } from "./json-package.entity";
import { PackageController } from "./package.controller";

@Module({
  controllers: [PackageController],
  imports: [TypeOrmModule.forFeature([JsonPackageEntity])],
})
export class PackageModule {}
