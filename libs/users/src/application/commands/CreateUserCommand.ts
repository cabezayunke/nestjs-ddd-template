import { Command } from '@shared/domain/commands/Command';

export class CreateUserCommand implements Command {
  constructor(
    public readonly email: string,
    public readonly id?: string,
    public readonly name?: string,
  ) {}
}
