# nestjs-ddd-template

NestJS DDD template project. Some things to consider:
* Separate `apps/` and `libs/` folders.
* `libs/` will contain different contexts of our domain plus a `shared/` one with DDD related code (value objects, repository, queries, etc)
* `libs/` will also contain independent modules such as * `logger` or `server` utils (api error, request context, that will help setting up a server app).

# Apps
## Core API

Monolith API that will import all contexts to run in a single API. We are takign advantage of MestJS CQRS module to separate reads and writes:

Example read request (simplified):
```
Controller > QueryBus > QueryHandler > QueryExecutor
```
In the future, in order to reuse code or make multiple queries if necessary in a single request, we could introduce an application service/use case:
```
Controller > QueryBus > QueryHandler > UseCase > QueryExecutor
```

In a similar way, we will have write reqiests:
```
Controller > CommandBus > CommandHandler > Repository, EventPublisher, other domain services

# and with use cases...
Controller > CommandBus > CommandHandler > UseCase > Repository, EventPublisher, other domain services
```
NOTES:
- the QueryExecutor will return plain data and will never make use of Aggregates, so we avoid triggering any side effects by mistake
- since we don't use Aggregates, we will not be firing any events either

TODO:
- a microservice approach where we have a single app for each context and they communitate via http

## CLI

- this will be used to add convenient commands for managing data, deployments or other stuff related to our apps and environments
- we can take advantage of NestJS integration with `commander` for tihs

TODO:
- start CLI project

# Libs

* **Contexts**: users, shared
* **Utils**: logger, server

### Context module example
```ts
@Module({
  // imports independant smaller utils modules, either ours or from NestJS
  imports: [LoggerModule, CqrsModule, SharedModule],
  providers: [
    // handler (both queries, commands and events) that will be called from controllers
    // or when an event is fired
    // commands
    CreateUserCommandHandler,
    // queries
    GetUserByEmailQueryHandler,
    GetUsersQueryHandler,
    // event subscribers
    UserSingleEventSubscriber,
    // providers
    // will be used by handlers for now (may be used by UseCases when introduced)
    // this is an example using an abstract class
    { provide: UserRepository, useClass: InMemoryUserRepository },
    // this is an example using an interface (needs @Inject decoractor in target class)
    { provide: 'QueryExecutor', useFactory: () => new InMemoryUserQueryExecutor() },
  ],
  // separate controllers for queries and commands
  controllers: [UserQueryController, UserCommandController],
  // we should avoid cross-module dependecies
  // but if we need it for some reason, we can export them
  exports: [
    { provide: UserRepository, useClass: InMemoryUserRepository },
    { provide: 'QueryExecutor', useFactory: () => new InMemoryUserQueryExecutor() },
  ],
})
export class UsersModule {}
```

### Adding new lib

1. Create new folder in `libs/`
2. In `libs` and `apps` that will be using this new library, add the path in the `tsconfig`, for example:
```json
"references": [
  {
    "path": "../../libs/logger"
  },
],
"paths": {
  "@utils/logger": [
    "../../libs/logger/src"
  ],
  "@utils/logger/*": [
    "../../libs/logger/src/*"
  ],
}
```
3. Amend imports if necessary (if it's created from existed code, when splitting 1 lib into 2 for example)
4. Add it to the `projects` config in `nest-cli.json`:
```json
 "logger": {
      "type": "library",
      "root": "libs/logger",
      "entryFile": "LoggerModule",
      "sourceRoot": "libs/logger/src",
      "compilerOptions": {
        "tsConfigPath": "libs/logger/tsconfig.lib.json"
      }
    },
```
5. Add mapping in `jest` config `moduleNameMapper`, so it is also avaialble in tests:
```
  moduleNameMapper: {
    "^@utils/logger(|/.*)$": "<rootDir>/libs/logger/src/$1",
  },
```
6. Add new modules in `imports` for ALL modules that will use the new lib module. For example:
```ts
@Module({
  imports: [
    LoggerModule,
  ],
})
export class CoreApiModule {}

@Module({
  imports: [
    LoggerModule,
  ],
})
export class UsersModule {}

// and so on
```

# Databases

### Config

We don't make use of NestJS capabilities in this case, since IMO it makes the setup for tests more tedious. 
We have a simple `ConnectionManager` with an implementation for each db in use. This can be called when initialing any app, api or cli, as well as test.

### Tests

Common tests for `Repostiory`s and `QueryExecutor`s.
Tests are reused for the different implementations, since they should behave exactly the same. The only difference will be the setup of those tests.
Example:
```ts
// in-memory
describe('InMemoryUserRepositoryTest', () => {
  runUserRepositoryTests(() => new InMemoryUserRepository());
});

// cockroachdb with TypeORM
describe('CockroachUserRepository', () => {
  beforeAll(async () => {
    await connectTypeORMTestDb({
      host: 'localhost',
      port: 26257,
      user: 'root',
      database: 'defaultdb',
    });
  });

  afterAll(async () => {
    await disconnectTypeORMTestDb();
  });

  runUserRepositoryTests(() => new CockroachUserRepository(getUserTypeORMRepository()));
});

// mongo with Mongoose
describe('MongooseUserRepositoryTest', () => {
  beforeAll(async () => {
    await connectMongooseTestDb();
  });

  afterAll(async () => {
    await disconnectMongooseTestDb();
  });

  describe('run after setup', () => {
    runUserRepositoryTests(() => new MongooseUserRepository());
  });
});

```

### Migrations

Core API cockroach/postgres migrations can be run with `npm run migratons:test` for integration tests. 
The env var `MIGRATIONS_ENV` can be used to run the migrations in other environments. The value will be used as suffix to read the corresponging env file. For example:
```
MIGRATIONS_ENV=test npm run typeorm -- migration:run -d ./apps/core-api/migrations.ts"

# this will read `.env.test` and run the migrations with that config
```

TODO:
- migrations for mongo

# Local dev and testing

### Tests
Get databases up an running
```
docker-compose up -d
```
Create `.env.test` file from env example
```
cp .env.example .env.test
```
NOTE: you should not need any changes in the values

Run tests
```sh
# will run: jest --config ./jes.config.ts --coverage --runInBand
npm test:coverage 

# or
npm test -- --runInBand
```
NOTE: because of integration tests and DB connections, we need `--runInband` option until we find a better solution

### Local dev and debug
Create `.env.local` file from env example
```
cp .env.example .env.local
```
NOTE: you should not need any changes in the values
TODO: create separate docker-compose to avoid using the same DBs we use for tests

Run locally
```
npm run start:local

# or
npm run start:debug

# or
npm run start:watch
```
TODO: setup to run the core-api in a docker container still WIP and not tested