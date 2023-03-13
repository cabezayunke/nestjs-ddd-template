import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/CreateUserCommand';

export interface CreateUserInput {
  readonly email: string;
  readonly id?: string;
  readonly name?: string;
}

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() { email, id, name }: CreateUserInput): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(email, id, name));
  }
}
