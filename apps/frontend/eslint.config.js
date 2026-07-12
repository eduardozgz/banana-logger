import baseConfig, { restrictEnvAccess } from "@bl/eslint-config/base";
import reactConfig from "@bl/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [
      "dist/**",
      // ignore submodules
      "**/twemoji/**",
      "**/unicode-emoji-json/**",
    ],
  },
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        // projectService (enabled in the base config) auto-discovers the right
        // tsconfig per file; a `project` list here is redundant and errors.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "process",
              importNames: ["env"],
              message:
                "Use `import { env } from '~/env'` instead to ensure validated types.",
            },
            {
              name: "react-router",
              importNames: ["useNavigate", "Link", "NavLink"],
              message:
                "Use `~/lib/navigation` instead to support dirty form blocking.",
            },
            {
              name: "@bl/ui/Link",
              message:
                "This module has been moved. Use `~/app/components/Link` instead.",
            },
            {
              name: "@bl/ui/LinkUnderlined",
              message:
                "This module has been moved. Use `~/app/components/LinkUnderlined` instead.",
            },
          ],
        },
      ],
    },
  },
];
