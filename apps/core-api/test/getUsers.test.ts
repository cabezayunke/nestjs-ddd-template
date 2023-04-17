import { INestApplication, Logger } from '@nestjs/common';
import { PrettyWinstonLogger } from '@shared/infrastructure/logger/PrettyWinstonLogger';
import { InMemoryQueryExecutor } from '@shared/infrastructure/queries/InMemoryQueryExecutor';
import request from 'supertest';
import { createTestApp } from '../../../libs/shared/test/e2eSetup';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { CoreApiModule } from '../src/CoreApiModule';

describe('Get users (e2e)', () => {
  let app: INestApplication;
  const user = UserObjectMother.fullUser();

  beforeEach(async () => {
    app = await createTestApp(CoreApiModule, [
      {
        provide: 'QueryExecutor',
        useFactory: () =>
          new InMemoryQueryExecutor([user.toPrimitives()]),
      },
      { provide: Logger, useClass: PrettyWinstonLogger },
    ]);
  });

  it('GET /users', async () => {
    await request(app.getHttpServer()).get(`/users?limit=2&offset=0&order=asc`).expect(200);
  });
});
