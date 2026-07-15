import baseConfig from "@bl/eslint-config/base";
import reactConfig from "@bl/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // @bl/ui is a component library, not a Vite app, so fast-refresh's
    // one-export-per-file constraint (e.g. a component + its cva variants) does
    // not apply here.
    files: ["**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];
