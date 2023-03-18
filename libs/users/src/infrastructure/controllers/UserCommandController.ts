import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from '../../application/commands/CreateUserCommand';
import { CreateUserInput } from './input/CreateUserInput';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Some users may not be able to manage users',
  })
  async createUser(@Body() { email, id, name }: CreateUserInput): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(email, id, name));
  }
}
