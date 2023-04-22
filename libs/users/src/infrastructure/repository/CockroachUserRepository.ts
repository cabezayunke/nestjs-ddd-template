import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserId } from '@context/users/domain/value-object/UserId';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { FilterType } from '@shared/domain/criteria/filters/Filter';
import { SingleFilter } from '@shared/domain/criteria/filters/SingleFilter';
import { Repository } from 'typeorm';
import { CockroachUserRepositoryMapper } from './CockroachUserRepositoryMapper';
import { UserEntity } from './UserEntity';

export class CockroachUserRepository implements UserRepository {
  constructor(private readonly repository: Repository<UserEntity>) {}

  async find(criteria: Criteria): Promise<User[]> {
    if (criteria.isEmpty()) {
      const result = await this.repository.find();
      return result.map(CockroachUserRepositoryMapper.toDomain);
    }

    // ignore multi-filter for now
    if (criteria.hasFilter() && criteria.filter?.type === FilterType.SINGLE) {
      const filter = criteria.filter as SingleFilter;

      if (filter.field.toString() === 'id' && filter.operator.isEqual()) {
        const result = await this.repository.findOne({
          where: { id: filter.value.toString() },
        });
        return result ? [CockroachUserRepositoryMapper.toDomain(result)] : [];
      }

      if (filter.field.toString() === 'email' && filter.operator.isEqual()) {
        const result = await this.repository.findOne({
          where: { email: filter.value.toString() },
        });
        return result ? [CockroachUserRepositoryMapper.toDomain(result)] : [];
      }
    }

    return [];
  }

  async remove(id: UserId): Promise<void> {
    await this.repository.softDelete({ id: id.value });
  }

  async save(user: User): Promise<void> {
    await this.repository.save(CockroachUserRepositoryMapper.fromDomain(user));
  }
}
