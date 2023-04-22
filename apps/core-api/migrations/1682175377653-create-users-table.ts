import { MigrationInterface, QueryRunner, Table } from "typeorm";

const USER_TABLE = new Table({
  name: 'users',
  columns: [
    {
      name: 'id',
      type: 'string',
      isPrimary: true,
    },
    {
      name: 'email',
      type: 'varchar',
      length: '255',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: true,
    },
    {
      name: 'createdAt',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'updatedAt',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'deletedAt',
      type: 'timestamptz',
      isNullable: true,
    },
  ],
});

export class CreateTable1682175377653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(USER_TABLE, true, true, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(USER_TABLE)
    }

}
