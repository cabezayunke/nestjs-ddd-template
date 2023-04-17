import { UserNotFound } from "@context/users/domain/error/UserNotFound";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@shared/domain/Logger";
import { Criteria } from "@shared/domain/criteria/Criteria";
import { QueryExecutor } from "@shared/domain/queries/QueryExecutor";
import { Handler } from "../Handler";
import { GetUserByEmailQuery } from "./GetUserByEmailQuery";
import { GetUserByEmailQueryResponse } from "./GetUserByEmailQueryResponse";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler 
  extends Handler 
  implements IQueryHandler<GetUserByEmailQuery, GetUserByEmailQueryResponse> 
{
  constructor(
    @Inject('QueryExecutor') private readonly queryExecutor: QueryExecutor,
    private readonly logger: Logger,
  ) {
    super();
   }

   async execute(query: GetUserByEmailQuery): Promise<GetUserByEmailQueryResponse> {
    this.logger.info('GetUserByEmailQuery', {
      query,
      ...this.getRequestContextData(),
    });
    const criteria = Criteria.equal('email', query.email);
    const result = await this.queryExecutor.execute<GetUserByEmailQueryResponse>(criteria);
    if (!result.length) {
      throw new UserNotFound()
    }
    return result[0] as GetUserByEmailQueryResponse;
  }
}
