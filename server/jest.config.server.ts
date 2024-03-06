/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ["dotenv/config"],
  testMatch: ["**/*.test.ts"]
}
