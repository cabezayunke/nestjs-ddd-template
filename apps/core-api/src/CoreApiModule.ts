import { UsersModule } from '@context/users/UsersModule';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
export class CoreApiModule {}
