import { UserQueryFactory } from '@context/users/application/queries/UserQueryFactory';
import { InMemoryUserQueryFactory } from '@context/users/infrastructure/repository/InMemoryUserQueryFactory';
import { INestApplication, Logger } from '@nestjs/common';
import { WinstonLogger } from '@shared/infrastructure/logger/WinstonLogger';
import request from 'supertest';
import { createTestApp } from '../../../libs/shared/test/e2eSetup';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { CoreApiModule } from '../src/CoreApiModule';

describe('Get user by id (e2e)', () => {
  let app: INestApplication;
  const user = UserObjectMother.fullUser();

  beforeEach(async () => {
    app = await createTestApp(CoreApiModule, [
      {
        provide: UserQueryFactory,
        useFactory: () =>
          new InMemoryUserQueryFactory({ [user.id.value]: user.toPrimitives() }),
      },
      { provide: Logger, useClass: WinstonLogger },
    ]);
  });

  it('GET /users/:email', async () => {
    await request(app.getHttpServer()).get(`/users/${user.email.value}`).expect(200);
  });
});
