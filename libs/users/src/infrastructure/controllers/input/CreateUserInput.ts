import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({ description: 'Email is always required and UNIQUE for all users' })
  readonly email: string;

  @ApiProperty({
    required: false,
    description: 'Useful to create the ID from clients, since command are async',
  })
  readonly id?: string;

  @ApiProperty({ required: false })
  readonly name?: string;
}
