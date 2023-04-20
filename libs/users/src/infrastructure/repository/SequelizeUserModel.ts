import { UserDto } from '@context/users/domain/UserDto';
import {
  AllowNull,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model<UserDto, UserDto> {
  @PrimaryKey
  @Column
  id: string;

  @AllowNull
  @Column
  name?: string;

  @Column
  email: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
