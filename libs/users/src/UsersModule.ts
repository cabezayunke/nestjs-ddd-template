import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';
import { CreateUserCommandHandler } from './application/commands/CreateUserCommandHandler';
import { GetUserByEmailQueryHandler } from './application/queries/GetUserByEmailQueryHandler';
import { UserRepository } from './domain/UserRepository';
import { UserController } from './infrastructure/controllers/UserController';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    // commands
    CreateUserCommandHandler,
    // queries
    GetUserByEmailQueryHandler,
    // providers
    InMemoryUserRepository,
    { provide: UserRepository, useClass: InMemoryUserRepository },
  ],
  controllers: [UserController],
  exports: [UserRepository, InMemoryUserRepository],
})
export class UsersModule {}
