import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserId } from '@context/users/domain/value-object/UserId';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { FilterType } from '@shared/domain/criteria/filters/Filter';
import { SingleFilter } from '@shared/domain/criteria/filters/SingleFilter';
import { PgSequelizeUserRepositoryMapper } from './PgSequelizeUserRepositoryMapper';
import { User as SequelizeUser } from './SequelizeUserModel';

export class PgSequelizeUserRepository implements UserRepository {
  async find(criteria: Criteria): Promise<User[]> {
    if (criteria.isEmpty()) {
      const result = await SequelizeUser.findAll();
      return result.map(PgSequelizeUserRepositoryMapper.toDomain);
    }

    // ignore multi-filter for now
    if (criteria.hasFilter() && criteria.filter?.type === FilterType.SINGLE) {
      const filter = criteria.filter as SingleFilter;

      if (filter.field.toString() === 'id' && filter.operator.isEqual()) {
        const result = await SequelizeUser.findAll({
          where: { id: filter.value.toString() },
        });
        return result.map(PgSequelizeUserRepositoryMapper.toDomain);
      }

      if (filter.field.toString() === 'email' && filter.operator.isEqual()) {
        const result = await SequelizeUser.findAll({
          where: { email: filter.value.toString() },
        });
        return result.map(PgSequelizeUserRepositoryMapper.toDomain);
      }
    }

    return [];
  }

  async remove(id: UserId): Promise<void> {
    await SequelizeUser.destroy({ where: { id: id.value } });
  }

  async save(user: User): Promise<void> {
    await SequelizeUser.upsert(user.toPrimitives());
  }
}
