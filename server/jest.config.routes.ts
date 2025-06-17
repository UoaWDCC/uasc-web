/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ["dotenv/config"],
  testMatch: ["<rootDir>/src/middleware/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/middleware/routes.setup.ts"]
}
