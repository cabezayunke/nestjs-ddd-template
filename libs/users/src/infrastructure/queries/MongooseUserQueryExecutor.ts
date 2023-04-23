import { MongooseQueryExecutor } from '@shared/infrastructure/queries/MongooseQueryExecutor';
import { UserModelType } from '../repository/UserModel';

export class MongooseUserQueryExecutor extends MongooseQueryExecutor<UserModelType> {}
