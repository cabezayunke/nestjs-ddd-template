import { TypeOrmQueryExecutor } from '@shared/infrastructure/queries/TypeOrmQueryExecutor';
import { UserEntity } from '../repository/UserEntity';

export class TypeOrmUserQueryExecutor extends TypeOrmQueryExecutor<UserEntity> {}
