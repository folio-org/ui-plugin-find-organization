const commonCofig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...commonCofig,
  testMatch: ['**/OrganizationSearch/?(*.)test.{js,jsx}'],
  coverageDirectory: './artifacts/coverage-jest/',
  collectCoverageFrom: [
    '**/OrganizationSearch/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
};
