import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryColumn({
    primary: true,
    unique: true,
  })
  id: string;

  @Column({
    length: 100,
    nullable: true,
  })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'NOW()' })
  createdAt: Date;

  @Column({ default: 'NOW()' })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
