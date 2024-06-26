/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svg.ts",
    "\\.(css|less)$": "<rootDir>/__mocks__/css.ts"
  }
}
