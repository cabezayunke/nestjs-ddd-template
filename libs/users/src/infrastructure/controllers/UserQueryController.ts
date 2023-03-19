import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { UserQueryFactory } from '@context/users/application/queries/UserQueryFactory';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUserByEmailParams } from './input/GetUserByEmailParams';
import { UserOutput } from './output/UserOutput';

@ApiBearerAuth()
@ApiTags('users')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryFactory: UserQueryFactory) {}

  @Get(':email')
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({
    description: 'Not found. User does not exist',
  })
  async getUserByEmail(@Param() { email }: GetUserByEmailParams): Promise<UserOutput> {
    return this.userQueryFactory.findUserByEmail(new GetUserByEmailQuery(email));
  }
}
