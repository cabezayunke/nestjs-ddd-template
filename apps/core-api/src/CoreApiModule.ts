import { UserRepository } from '@context/users/domain/UserRepository';
import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { UsersModule } from '@context/users/UsersModule';
import { Logger, Module } from '@nestjs/common';
import { WinstonLogger } from '@shared/infrastructure/logger/WinstonLogger';
import { SharedModule } from '@shared/SharedModule';

@Module({
  imports: [UsersModule, SharedModule],
  providers: [
    InMemoryUserRepository,
    { provide: UserRepository, useClass: InMemoryUserRepository },
    WinstonLogger,
    { provide: Logger, useClass: WinstonLogger },
  ],
  exports: [UsersModule, SharedModule],
})
export class CoreApiModule {}
