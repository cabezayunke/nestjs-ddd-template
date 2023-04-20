import { INestApplication, Logger } from '@nestjs/common';
import { PrettyWinstonLogger } from '@shared/infrastructure/logger/PrettyWinstonLogger';
import { InMemoryQueryExecutor } from '@shared/infrastructure/queries/InMemoryQueryExecutor';
import request from 'supertest';
import { createTestApp } from '../../../libs/shared/test/setup/e2eSetup';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { CoreApiModule } from '../src/CoreApiModule';

describe('Get user by email (e2e)', () => {
  let app: INestApplication;
  const user = UserObjectMother.fullUser();

  beforeEach(async () => {
    app = await createTestApp(CoreApiModule, [
      {
        provide: 'QueryExecutor',
        useFactory: () => new InMemoryQueryExecutor([user.toPrimitives()]),
      },
      { provide: Logger, useClass: PrettyWinstonLogger },
    ]);
  });

  it('GET /users/:email', async () => {
    await request(app.getHttpServer()).get(`/users/${user.email.value}`).expect(200);
  });
});
