const nextJest = require("next/jest");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config({ path: ".env.development" });

const createJestConfig = nextJest({ dir: "." });
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
