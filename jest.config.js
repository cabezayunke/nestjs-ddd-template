module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@shared(|/.*)$": "<rootDir>/libs/shared/src/$1",
    "^@context/users(|/.*)$": "<rootDir>/libs/users/src/$1"
  },
  rootDir: ".",
  testEnvironment: "node",
  roots: [
    "<rootDir>/apps/",
    "<rootDir>/libs/"
  ],
  // "testRegex": ".*\\.spec\\.ts$",
  // "collectCoverageFrom": [
  //   "**/*.(t|j)s"
  // ],
  // "coverageDirectory": "./coverage",
};
