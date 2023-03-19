import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email is always required and UNIQUE for all users' })
  readonly email: string;

  @ApiProperty({
    required: false,
    description: 'Useful to create the ID from clients, since command are async',
  })
  @IsUUID(4)
  @IsOptional()
  readonly id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 100)
  readonly name?: string;
}
