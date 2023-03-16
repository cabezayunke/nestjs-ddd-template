import { GetUserByEmailQuery } from './GetUserByEmailQuery';
import { GetUserByEmailQueryResponse } from './GetUserByEmailQueryResponse';

export abstract class UserQueryFactory {
  abstract findUserByEmail(
    query: GetUserByEmailQuery,
  ): Promise<GetUserByEmailQueryResponse>;
}
