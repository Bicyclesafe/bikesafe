module.exports = {

        preset: "ts-jest",
        testEnvironment: "node",
        globalTeardown: "./__tests__/teardown.js",
        modulePathIgnorePatterns: ["./__tests__/teardown.js"],
  };
