const stripesConfig = require('@folio/jest-config-stripes');
const acqConfig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...stripesConfig,
  setupFiles: [
    ...stripesConfig.setupFiles,
    ...acqConfig.setupFiles,
  ],
  testMatch: ['**/OrganizationSearch/**/?(*.)test.{js,jsx}'],
  coverageDirectory: './artifacts/coverage-jest/',
  collectCoverageFrom: [
    '**/OrganizationSearch/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
};
