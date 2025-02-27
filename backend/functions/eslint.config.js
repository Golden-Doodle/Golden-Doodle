import { defineConfig } from "eslint-define-config";

export default defineConfig([
  {
    // General configuration for all files
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        es6: true,
        node: true,
      },
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
    },
  },
  {
    // Example of configuration for specific files (glob pattern)
    files: ["**/*.spec.*"], // Matching pattern for test files
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        mocha: true, // Specific globals for Mocha tests
      },
    },
    rules: {
      // You can add specific rules for test files here if needed
    },
  },
]);
