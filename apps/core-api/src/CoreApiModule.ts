import { UsersModule } from '@context/users/UsersModule';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestContextMiddleware } from '@shared/infrastructure/server/RequestContextMiddleware';
import { SharedModule } from '@shared/SharedModule';
import { loadCoreApiConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [loadCoreApiConfig],
    }),
    UsersModule,
    SharedModule,
  ],
})
export class CoreApiModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
