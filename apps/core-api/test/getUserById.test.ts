import { UserRepository } from '@context/users/domain/UserRepository';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserObjectMother } from '../../../libs/users/test/UserObjectMother';
import { createTestApp } from './setup';

jest.setTimeout(250000);

describe('Get user by id (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const [testApp, module] = await createTestApp();
    app = testApp;
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('GET /users', async () => {
    const data = UserObjectMother.fullUser();
    await userRepository.save(data);

    await request(app.getHttpServer()).get(`/users/${data.email.value}`).expect(200);
  });
});
