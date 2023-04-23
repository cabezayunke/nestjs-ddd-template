import { UsersModule } from '@context/users/UsersModule';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/SharedModule';
import { LoggerModule } from '@utils/logger/LoggerModule';
import { ServerModule } from '@utils/server/ServerModule';
import { RequestContextMiddleware } from '@utils/server/infrastructure/RequestContextMiddleware';
import { loadCoreApiConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [loadCoreApiConfig],
    }),
    LoggerModule,
    ServerModule,
    SharedModule,
    UsersModule,
  ],
})
export class CoreApiModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
