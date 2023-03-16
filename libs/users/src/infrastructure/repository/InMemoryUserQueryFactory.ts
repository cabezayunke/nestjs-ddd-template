import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { GetUserByEmailQueryResponse } from '@context/users/application/queries/GetUserByEmailQueryResponse';
import { UserQueryFactory } from '@context/users/application/queries/UserQueryFactory';
import { UserNotFound } from '@context/users/domain/error/UserNotFound';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserQueryFactory implements UserQueryFactory {
  private users: Record<string, unknown> = {};

  constructor(initialData?: Record<string, unknown>) {
    this.users = { ...initialData };
  }

  async findUserByEmail(
    query: GetUserByEmailQuery,
  ): Promise<GetUserByEmailQueryResponse> {
    const results = Object.values(this.users).filter(
      u =>
        (u as GetUserByEmailQueryResponse).email.toLowerCase() ===
        (query.email as string).toLowerCase(),
    );

    if (!results?.length) {
      throw new UserNotFound();
    }

    return results[0] as GetUserByEmailQueryResponse;
  }
}
