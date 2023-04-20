import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/SharedModule';
import { MongooseConfigService } from '@shared/infrastructure/data/MongooseConfigService';
import { CreateUserCommandHandler } from './application/commands/CreateUserCommandHandler';
import { UserSingleEventSubscriber } from './application/events/UserSingleEventSubscriber';
import { GetUserByEmailQueryHandler } from './application/queries/GetUserByEmailQueryHandler';
import { GetUsersQueryHandler } from './application/queries/GetUsersQueryHandler';
import { UserRepository } from './domain/UserRepository';
import { UserCommandController } from './infrastructure/controllers/UserCommandController';
import { UserQueryController } from './infrastructure/controllers/UserQueryController';
import { InMemoryUserQueryExecutor } from './infrastructure/queries/InMemoryUserQueryExecutor';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';

@Module({
  imports: [
    CqrsModule,
    SharedModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    })
  ],
  providers: [
    // commands
    CreateUserCommandHandler,
    // queries
    GetUserByEmailQueryHandler,
    GetUsersQueryHandler,
    // events
    UserSingleEventSubscriber,
    // providers
    { provide: UserRepository, useFactory: () => new InMemoryUserRepository() },
    { provide: 'QueryExecutor', useFactory: () => new InMemoryUserQueryExecutor() },
  ],
  controllers: [UserQueryController, UserCommandController],
  exports: [UserRepository],
})
export class UsersModule {}
