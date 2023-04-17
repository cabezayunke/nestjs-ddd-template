import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
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
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':email')
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({
    description: 'Not found. User does not exist',
  })
  async getUserByEmail(@Param() { email }: GetUserByEmailParams): Promise<UserOutput> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
