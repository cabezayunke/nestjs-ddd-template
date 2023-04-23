# nestjs-ddd-template
NestJS DDD template project

# Apps
## Core API

## CLI
TODO

# Libs

Contexts: users, shared
Utils: logger, server

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