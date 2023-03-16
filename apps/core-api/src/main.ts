import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { CoreApiModule } from './CoreApiModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreApiModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('serverPort') as number);
  console.log('starting server', configService.get('serverPort'));
}
bootstrap();
