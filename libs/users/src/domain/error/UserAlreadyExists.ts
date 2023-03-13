import { DomainError } from '@shared/domain/errors/DomainError';

export class UserAlreadyExists extends DomainError {
  constructor() {
    super('User already exsits');
  }
}
