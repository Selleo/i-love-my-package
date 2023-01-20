import { JsonPackageEntity } from "@app/package/json-package.entity";
import {
  Dependencies,
  JSONPackage,
  MyPackage,
  UsedBy,
} from "@app/package/json-package.type";
import { CurrentUser } from "@app/user/current-user.decorator";
import { User } from "@app/user/user.entity";
import { UserGuard } from "@app/user/user.guard";
import {
  Body,
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
      let pkg = await JsonPackageEntity.findOne({
        where: { name: dependency.name },
        relations: { users: true },
      });

      console.log(pkg?.users);

      if (!pkg)
        pkg = JsonPackageEntity.create({
          name: dependency.name,
        });

      if (!pkg?.versions) pkg.versions = [];

      const ver = dependency.version.replace(/[^\d.]/, "");

      if (!pkg.versions?.map((ver) => ver.userId)?.includes(currentUser.id))
        pkg.versions.push({
          userId: currentUser.id,
          value: ver,
        });

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
      users: pkg.users,
    }));
  }

  @Get()
  async packages(@Body() body: { search?: string }, @CurrentUser() user: User) {
    const packagesQuery = await JsonPackageEntity.createQueryBuilder(
      "pkg"
    ).innerJoin("pkg.users", "users");

    if (body.search)
      packagesQuery.where("LOWER(pkg.name) LIKE :search", {
        search: `%${body.search}%`,
      });

    const packages = await packagesQuery.getMany();

    const ids = packages.map((p) => p.id);

    const all = [];

    for (const id of ids) {
      all.push(await this.getPackage(id));
    }

    return all;
  }

  @Get(":packageId")
  async package(@Param("packageId") packageId: number) {
    return this.getPackage(packageId);
  }

  async getPackage(packageId: number): Promise<MyPackage> {
    const package_ = await JsonPackageEntity.createQueryBuilder("pkg")
      .leftJoinAndSelect("pkg.users", "users")
      .andWhere("pkg.id = :packageId", { packageId })
      .getOneOrFail();

    const usedBy: UsedBy[] = [];

    for (const user of package_.users) {
      const version = package_.versions.find((ver) => ver.userId === user.id);
      if (!version) continue;
      usedBy.push({
        user: await User.findOneOrFail({ where: { id: version.userId } }),
        version: version?.value,
      });
    }

    const mypkg: MyPackage = {
      id: package_.id,
      name: package_.name,
      usedBy,
    };

    return mypkg;
  }
}

// type MyPackage = {
//   id: number;
//   name: string;
//   usedBy: [
//     {
//       user: User;
//       version: string;
//     }
//   ];
//   reactions: {
//     likes: [{ user: User; comment: string }];
//     dislikes: [{ user: User; comment: string }];
//     warnings: [{ user: User; comment: string }];
//   };
// };
