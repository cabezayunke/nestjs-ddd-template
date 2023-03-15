import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/CreateUserCommand';

export interface CreateUserInput {
  readonly email: string;
  readonly id?: string;
  readonly name?: string;
}

export interface UserOutput {
  readonly email: string;
  readonly id?: string;
  readonly name?: string;
}

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() { email, id, name }: CreateUserInput): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(email, id, name));
  }

  @Get(':email')
  async getUserByEmail(@Param() { email }: { email: string }): Promise<UserOutput> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
