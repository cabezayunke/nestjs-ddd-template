import { NestFactory } from '@nestjs/core';
import { CoreApiModule } from './CoreApiModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreApiModule);
  await app.listen(3000);
}
bootstrap();
