import { JsonPackageEntity } from "@app/package/json-package.entity";
import {
  Dependencies,
  JSONPackage,
  MyPackage,
} from "@app/package/json-package.type";
import { User } from "@app/user/user.entity";
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("package")
export class PackageController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
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

    console.log(dependencies);

    const email = "test@test.ss";
    let currentUser = await User.findOneBy({ email });
    if (!currentUser) currentUser = await User.create({ email }).save();

    console.log(currentUser);

    const pkgsToSave = [];

    for (const dependency of dependencies) {
      console.log(dependency);
      let pkg = await JsonPackageEntity.findOneBy({
        name: dependency.name,
      });

      console.log(pkg);

      if (!pkg)
        pkg = JsonPackageEntity.create({
          name: dependency.name,
        });

      if (!pkg?.versions) pkg.versions = [];

      console.log("1");

      console.log(pkg.versions);

      const ver = dependency.version.replace(/[^\d.]/, "");

      if (!pkg.versions?.includes(ver)) pkg.versions.push(ver);

      console.log("2");
      if (!pkg.users) pkg.users = [];

      if (!pkg.users.map((user) => user.id)?.includes(currentUser.id))
        pkg.users.push(currentUser);

      console.log("3");

      console.log(pkg);

      pkgsToSave.push(pkg);
    }

    const savedPkgs = await JsonPackageEntity.save(pkgsToSave);

    return savedPkgs.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      versions: pkg.versions
    }));
  }
}
