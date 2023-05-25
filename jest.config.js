require('jest-preset-angular/ngcc-jest-processor');
const preset = require('jest-preset-angular/jest-preset');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'jest-preset-angular',
  testRunner: 'jest-jasmine2',
  testMatch: ['**/*.spec.ts'],
  maxWorkers: '50%',
  "setupFilesAfterEnv": ["<rootDir>/src/tests/jest.ts"],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'html'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|lodash-decorators-esm|@uppy/utils)'],
  globals: {
    'ts-jest': {
      ...preset.globals['ts-jest'],
      isolatedModules: true,
      // tsconfig: './tsconfig.test.json',
    },
  },
};
