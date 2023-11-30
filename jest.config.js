module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testPathIgnorePatterns: ['/../', 'App\\.test\\.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };