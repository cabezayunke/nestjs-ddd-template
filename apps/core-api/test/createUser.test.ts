import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { createTestApp } from './setup';

describe('Create user (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await createTestApp())[0];
  });

  it('POST /users', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(UserObjectMother.fullUserInput())
      .expect(201);
  });
});
