import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CoreApiModule } from '../src/CoreApiModule';

export const createTestApp = async (): Promise<[INestApplication, TestingModule]> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [CoreApiModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return [app, moduleFixture];
};
