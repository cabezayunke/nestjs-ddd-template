import { INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';

type TestProvider = { provide: any; useClass?: any; useValue?: any; useFactory?: any };

export const createTestApp = async (
  module: Type<any>,
  providers: TestProvider[],
): Promise<INestApplication> => {
  let builder: TestingModuleBuilder = Test.createTestingModule({
    imports: [module as unknown as Type<any>],
  });

  providers.map((p: TestProvider) => {
    if (p.useClass) {
      builder = builder.overrideProvider(p.provide).useClass(p.useClass);
    } else if (p.useValue) {
      builder = builder.overrideProvider(p.provide).useValue(p.useValue);
    } else if (p.useFactory) {
      builder = builder.overrideProvider(p.provide).useFactory({ factory: p.useFactory });
    } else {
      throw new Error('useClass/useValue/useFactory are mandatory for test providers');
    }
  });

  const testModule: TestingModule = await builder.compile();

  const app = await testModule.createNestApplication();
  await app.init();

  return app;
};
