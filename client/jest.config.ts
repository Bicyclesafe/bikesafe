export { }
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
    '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
  transformIgnorePatterns: [
      "/node_modules/(?!react-leaflet/.*)"
    ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx"
  ],
  testEnvironmentOptions: {
    jsdom: '25.0.1', // or the version you want to use
  },

setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}