module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [ '**/?(*.)jest.[jt]s?(x)' ],
  transformIgnorePatterns: [ '<rootDir>/node_modules/' ],
  testPathIgnorePatterns: [ '/node_modules/', '/.vscode/' ],
  collectCoverage: true
}