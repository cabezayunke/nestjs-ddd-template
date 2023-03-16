import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { UserQueryFactory } from '@context/users/application/queries/UserQueryFactory';
import { Controller, Get, Param } from '@nestjs/common';
import { UserOutput } from './output/UserOutput';

@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryFactory: UserQueryFactory) {}

  @Get(':email')
  async getUserByEmail(@Param() { email }: { email: string }): Promise<UserOutput> {
    return this.userQueryFactory.findUserByEmail(new GetUserByEmailQuery(email));
  }
}
