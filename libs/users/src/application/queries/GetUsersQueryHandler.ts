import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@shared/domain/Logger';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Order } from '@shared/domain/criteria/order/Order';
import { Pagination } from '@shared/domain/criteria/pagination/Pagination';
import { QueryExecutor } from '@shared/domain/queries/QueryExecutor';
import { Handler } from '../Handler';
import { GetUsersQuery } from './GetUsersQuery';
import { GetUsersQueryResponse } from './GetUsersQueryResponse';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  extends Handler
  implements IQueryHandler<GetUsersQuery, GetUsersQueryResponse[]>
{
  constructor(
    @Inject('QueryExecutor') private readonly queryExecutor: QueryExecutor,
    private readonly logger: Logger,
  ) {
    super();
  }

  async execute(query: GetUsersQuery): Promise<GetUsersQueryResponse[]> {
    this.logger.info('GetUsersQuery', {
      query,
      ...this.getRequestContextData(),
    });
    const criteria = new Criteria({
      pagination: Pagination.fromValues(query.limit, query.offset),
      order: Order.fromValues(query.orderBy, query.orderType),
    });
    return this.queryExecutor.execute<GetUsersQueryResponse>(criteria);
  }
}
