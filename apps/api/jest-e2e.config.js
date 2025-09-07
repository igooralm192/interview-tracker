/* eslint-disable */
const { readFileSync } = require('fs');
// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;
/** @type {import('jest').Config} */
module.exports = {
  // preset: '../../jest.preset.js',
  displayName: '@interview-tracker/api',
  roots: ['<rootDir>/e2e', '<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
  testRegex: '.*\\.e2e-spec\\.ts$',
};
