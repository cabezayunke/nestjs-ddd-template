module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@shared(|/.*)$": "<rootDir>/libs/shared/src/$1",
    "^@context/users(|/.*)$": "<rootDir>/libs/users/src/$1",
    "^@utils/logger(|/.*)$": "<rootDir>/libs/logger/src/$1",
    "^@utils/server(|/.*)$": "<rootDir>/libs/server/src/$1",
  },
  rootDir: ".",
  testEnvironment: "node",
  roots: [
    "<rootDir>/apps/",
    "<rootDir>/libs/"
  ],
  setupFiles: ["<rootDir>/jest.env.js"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    "Module.ts",
    "main.ts",
    "Test.ts"
],
};
