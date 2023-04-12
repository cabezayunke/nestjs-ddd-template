import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "winston";
import { Handler } from "../Handler";
import { GetUserByEmailQuery } from "./GetUserByEmailQuery";
import { GetUserByEmailQueryResponse } from "./GetUserByEmailQueryResponse";
import { UserQueryFactory } from "./UserQueryFactory";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler 
  extends Handler 
  implements IQueryHandler<GetUserByEmailQuery, GetUserByEmailQueryResponse> 
{
  constructor(
    private readonly queryFactory: UserQueryFactory,
    private readonly logger: Logger,
  ) {
    super();
   }

   async execute(query: GetUserByEmailQuery): Promise<GetUserByEmailQueryResponse> {
    this.logger.info('GetUserByEmailQuery', {
      query,
      ...this.getRequestContextData(),
    });
    return this.queryFactory.findUserByEmail(query);
  }
}
