import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';
import { CreateUserCommandHandler } from './application/commands/CreateUserCommandHandler';
import { UserQueryFactory } from './application/queries/UserQueryFactory';
import { UserRepository } from './domain/UserRepository';
import { UserCommandController } from './infrastructure/controllers/UserCommandController';
import { UserQueryController } from './infrastructure/controllers/UserQueryController';
import { InMemoryUserQueryFactory } from './infrastructure/repository/InMemoryUserQueryFactory';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    // commands
    CreateUserCommandHandler,
    // queries
    // InMemoryUserQueryFactory,
    { provide: UserQueryFactory, useFactory: () => new InMemoryUserQueryFactory() },
    // providers
    // InMemoryUserRepository,
    { provide: UserRepository, useFactory: () => new InMemoryUserRepository() },
  ],
  controllers: [UserQueryController, UserCommandController],
  exports: [
    UserRepository,
    // InMemoryUserRepository,
    UserQueryFactory,
    // InMemoryUserQueryFactory,
  ],
})
export class UsersModule {}
