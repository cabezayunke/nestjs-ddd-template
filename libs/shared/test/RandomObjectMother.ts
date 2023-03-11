import { faker } from '@faker-js/faker';

export class RandomObjectMother {
  int(min = 0, max = 100): number {
    return faker.datatype.number({ min, max });
  }

  float(min = 0, max = 100, precision = 0.1): number {
    return faker.datatype.number({ min, max, precision });
  }

  uuid(): string {
    return faker.datatype.uuid();
  }

  name(): string {
    return faker.name.fullName();
  }

  email(): string {
    return faker.internet.email();
  }
}
