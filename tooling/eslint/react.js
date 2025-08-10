import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as tseslint from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config([
  reactHooks.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      "react-hooks/react-compiler": "error",
    },
    extends: [reactRefresh.configs.vite],
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
]);
