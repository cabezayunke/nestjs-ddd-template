module.exports = {
  preset: 'ts-jest',
  // globals: {
  //   'ts-jest': {
  //     diagnostics: false,
  //     isolatedModules: true,
  //     tsconfig: './tsconfig.jest.json'
  //   }
  // },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: 'node',
};
