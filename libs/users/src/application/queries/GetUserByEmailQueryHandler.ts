import { UserNotFound } from '@context/users/domain/error/UserNotFound';
import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './GetUserByEmailQuery';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const result = await this.userRepository.find({ email: query.email });
    if (!result?.length) {
      throw new UserNotFound();
    }
    return result[0] as User;
  }
}
