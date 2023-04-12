import { Order } from '@shared/domain/criteria/order/Order';
import { Pagination } from '@shared/domain/criteria/pagination/Pagination';
import { GetUserByEmailQuery } from './GetUserByEmailQuery';
import { GetUserByEmailQueryResponse } from './GetUserByEmailQueryResponse';

export abstract class UserQueryFactory {
  abstract findUserByEmail(
    query: GetUserByEmailQuery,
  ): Promise<GetUserByEmailQueryResponse>;
  abstract findAllUsers(
    pagination: Pagination,
    order: Order
  ): Promise<GetUserByEmailQueryResponse>;
}
