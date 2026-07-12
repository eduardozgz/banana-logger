import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as tseslint from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config([
  // recommended-latest bundles rules-of-hooks + exhaustive-deps and the React
  // Compiler rules (the standalone "react-hooks/react-compiler" rule was removed
  // in eslint-plugin-react-hooks v7 in favour of these granular rules).
  reactHooks.configs.flat["recommended-latest"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    extends: [reactRefresh.configs.vite],
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
]);
