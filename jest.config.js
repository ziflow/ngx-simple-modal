const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const { defaultTransformerOptions } = require('jest-preset-angular/presets');

process.env.TZ = 'Europe/Warsaw';

module.exports = {
  preset: 'jest-preset-angular',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  // testRunner: 'jest-jasmine2',
  testMatch: ['**/*.spec.ts'],
  workerIdleMemoryLimit: '500mb',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'html'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|lodash-decorators-esm|uuid|@uppy/utils|.*\\.mjs)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        isolatedModules: true,
      },
    ],
  },
};
