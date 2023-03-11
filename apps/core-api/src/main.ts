import { NestFactory } from '@nestjs/core';
import { CoreApiModule } from './core-api.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreApiModule);
  await app.listen(3000);
}
bootstrap();
