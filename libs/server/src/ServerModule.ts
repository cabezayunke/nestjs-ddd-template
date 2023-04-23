import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { RequestContextMiddleware } from './infrastructure/RequestContextMiddleware';

@Module({
  imports: [RequestContextModule],
  providers: [RequestContextMiddleware],
  exports: [RequestContextMiddleware],
})
export class ServerModule {}
