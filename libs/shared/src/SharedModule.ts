import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { Logger } from './domain/Logger';
import { DomainEventPublisher } from './domain/events/DomainEventPublisher';
import { InMemoryAsyncDomainEventPublisher } from './infrastructure/events/InMemoryAsyncDomainEventPublisher';
import { JsonWinstonLogger } from './infrastructure/logger/JsonWinstonLogger';
import { PrettyWinstonLogger } from './infrastructure/logger/PrettyWinstonLogger';
import { InMemoryQueryExecutor } from './infrastructure/queries/InMemoryQueryExecutor';
import { RequestContextMiddleware } from './infrastructure/server/RequestContextMiddleware';

@Module({
  imports: [
    RequestContextModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  providers: [
    { provide: DomainEventPublisher, useClass: InMemoryAsyncDomainEventPublisher },
    InMemoryAsyncDomainEventPublisher,
    {
      provide: Logger,
      useFactory: (configService: ConfigService) => {
        if (configService.get('isLocal')) {
          return new PrettyWinstonLogger();
        }
        return new JsonWinstonLogger();
      },
      inject: [ConfigService],
    },
    PrettyWinstonLogger,
    JsonWinstonLogger,
    RequestContextMiddleware,
    InMemoryQueryExecutor,
  ],
  exports: [
    Logger,
    PrettyWinstonLogger,
    JsonWinstonLogger,
    DomainEventPublisher,
    InMemoryAsyncDomainEventPublisher,
    RequestContextMiddleware,
    InMemoryQueryExecutor,
  ],
})
export class SharedModule {}
