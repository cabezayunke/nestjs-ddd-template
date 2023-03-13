export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly id?: string,
    public readonly name?: string,
  ) {}
}
