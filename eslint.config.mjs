import jest from "eslint-plugin-jest";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", ".swc/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        // Node
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        // ES2021
        Map: "readonly",
        Set: "readonly",
        Promise: "readonly",
        // React
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  {
    files: ["infra/**/*.js", "infra/**/*.mjs", "jest.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettier,
];
