import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserCommand } from '../../application/commands/CreateUserCommand';
import { CreateUserInput } from './input/CreateUserInput';

@ApiBearerAuth()
@ApiTags('users')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@Controller('users')
export class UserCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'User created' })
  @ApiConflictResponse({
    description: 'Conflict. A user with the same email already exists',
  })
  async createUser(@Body() { email, id, name }: CreateUserInput): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(email, id, name));
  }
}
