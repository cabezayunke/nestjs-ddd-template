import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserByEmailParams {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email is always required and UNIQUE for all users' })
  readonly email: string;
}
