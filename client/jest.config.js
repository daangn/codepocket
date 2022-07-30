module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/src/**/*.test.tsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '\\.css$': '<rootDir>/styleMock.js',
  },
};
