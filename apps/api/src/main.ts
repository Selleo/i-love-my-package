import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { UserGuard } from "./user/user.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new UserGuard());
  await app.listen(4000);
}
bootstrap();
