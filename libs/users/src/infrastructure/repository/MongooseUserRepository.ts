import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserId } from '@context/users/domain/value-object/UserId';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { FilterType } from '@shared/domain/criteria/filters/Filter';
import { SingleFilter } from '@shared/domain/criteria/filters/SingleFilter';
import { MongooseUserRepositoryMapper } from './MongooseUserRepositoryMapper';
import { UserModel } from './UserModel';

export class MongooseUserRepository implements UserRepository {
  async find(criteria: Criteria): Promise<User[]> {
    if (criteria.isEmpty()) {
      const result = await UserModel.find().exec();
      return result.map(MongooseUserRepositoryMapper.toDomain);
    }

    // ignore multi-filter for now
    if (criteria.hasFilter() && criteria.filter?.type === FilterType.SINGLE) {
      const filter = criteria.filter as SingleFilter;

      if (filter.field.toString() === 'id' && filter.operator.isEqual()) {
        const result = await UserModel.find({ id: filter.value.toString() }).exec();
        return result.map(MongooseUserRepositoryMapper.toDomain);
      }

      if (filter.field.toString() === 'email' && filter.operator.isEqual()) {
        const result = await UserModel.find({ email: filter.value.toString() }).exec();
        return result.map(MongooseUserRepositoryMapper.toDomain);
      }
    }

    return [];
  }

  async remove(id: UserId): Promise<void> {
    await UserModel.findOneAndRemove({ id: id.value });
  }

  async save(user: User): Promise<void> {
    const model = await UserModel.create(MongooseUserRepositoryMapper.fromDomain(user));
    await model.save();
  }
}
