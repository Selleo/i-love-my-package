import { JsonPackageEntity } from "@app/package/json-package.entity";
import {
  Dependencies,
  JSONPackage,
  MyPackage,
} from "@app/package/json-package.type";
import { CurrentUser } from "@app/user/current-user.decorator";
import { User } from "@app/user/user.entity";
import { UserGuard } from "@app/user/user.guard";
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(UserGuard)
@Controller("package")
export class PackageController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() currentUser: User
  ): Promise<MyPackage[]> {
    const jsonPackage: JSONPackage = JSON.parse(file.buffer.toString());

    const dependencies: Dependencies[] = [];

    for (const key in jsonPackage.dependencies) {
      dependencies.push({
        name: key,
        version: jsonPackage.dependencies[key] as unknown as string,
      });
    }

    for (const key in jsonPackage.devDependencies) {
      dependencies.push({
        name: key,
        version: jsonPackage.devDependencies[key] as unknown as string,
      });
    }

    const pkgsToSave = [];

    for (const dependency of dependencies) {
      let pkg = await JsonPackageEntity.findOneBy({
        name: dependency.name,
      });

      if (!pkg)
        pkg = JsonPackageEntity.create({
          name: dependency.name,
        });

      if (!pkg?.versions) pkg.versions = [];

      const ver = dependency.version.replace(/[^\d.]/, "");

      if (!pkg.versions?.includes(ver)) pkg.versions.push(ver);

      if (!pkg.users) pkg.users = [];

      if (!pkg.users.map((user) => user.id)?.includes(currentUser.id))
        pkg.users.push(currentUser);

      pkgsToSave.push(pkg);
    }

    const savedPkgs = await JsonPackageEntity.save(pkgsToSave);

    return savedPkgs.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      versions: pkg.versions,
    }));
  }

  @Get()
  packages(@CurrentUser() user: User) {
    return JsonPackageEntity.createQueryBuilder("pkg")
      .innerJoin("pkg.users", "users")
      .where("users.id = :userId", { userId: user.id })
      .getMany();
  }

  @Get(":packageId")
  package(@Param("packageId") packageId: number, @CurrentUser() user: User) {
    return JsonPackageEntity.createQueryBuilder("pkg")
      .innerJoin("pkg.users", "users")
      .where("users.id = :userId", { userId: user.id })
      .andWhere("pkg.id = :packageId", { packageId })
      .getOne();
  }
}
