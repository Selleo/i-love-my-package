import { JSONPackage } from "@app/package/type";
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const packageJSON: JSONPackage = JSON.parse(file.buffer.toString());
  }
}
