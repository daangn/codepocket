export default {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/lib/setupTests.ts'],
  testMatch: ['**/lib/**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
