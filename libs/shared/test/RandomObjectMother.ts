import { faker } from '@faker-js/faker';

export class RandomObjectMother {
  static int(min = 0, max = 100): number {
    return faker.datatype.number({ min, max });
  }

  static float(min = 0, max = 100, precision = 0.1): number {
    return faker.datatype.number({ min, max, precision });
  }

  static uuid(): string {
    return faker.datatype.uuid();
  }

  static username(): string {
    return faker.name.fullName();
  }

  static email(): string {
    return faker.internet.email();
  }
}
