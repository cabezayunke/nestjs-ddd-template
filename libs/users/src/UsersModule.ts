import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';
import { CreateUserCommandHandler } from './application/commands/CreateUserCommandHandler';
import { UserRepository } from './domain/UserRepository';
import { CreateUserController } from './infrastructure/controllers/CreateUserController';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';

@Module({
  imports: [CqrsModule, SharedModule],
  providers: [
    CreateUserCommandHandler,
    InMemoryUserRepository,
    { provide: UserRepository, useClass: InMemoryUserRepository },
  ],
  controllers: [CreateUserController],
  exports: [UserRepository, InMemoryUserRepository],
})
export class UsersModule {}
