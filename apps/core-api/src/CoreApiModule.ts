import { UsersModule } from '@context/users/UsersModule';
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/SharedModule';

@Module({
  imports: [UsersModule, SharedModule],
})
export class CoreApiModule {}
