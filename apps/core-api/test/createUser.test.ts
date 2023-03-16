import { UserRepository } from '@context/users/domain/UserRepository';
import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { INestApplication, Logger } from '@nestjs/common';
import { WinstonLogger } from '@shared/infrastructure/logger/WinstonLogger';
import request from 'supertest';
import { createTestApp } from '../../../libs/shared/test/e2eSetup';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { CoreApiModule } from '../src/CoreApiModule';

describe('Create user (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp(CoreApiModule, [
      { provide: UserRepository, useFactory: () => new InMemoryUserRepository() },
      { provide: Logger, useClass: WinstonLogger },
    ]);
  });

  it('POST /users', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(UserObjectMother.fullUserInput())
      .expect(201);
  });
});
