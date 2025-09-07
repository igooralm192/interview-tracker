

/* eslint-disable */
import { readFileSync } from 'fs';
import type { Config } from 'jest';
// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;
const jestPreset = require('../../jest.preset.js').default;

export default {
  ...jestPreset,
  displayName: '@interview-tracker/api',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
  testRegex: '.+\\.e2e-spec\\.[tj]s$',
} as Config;


