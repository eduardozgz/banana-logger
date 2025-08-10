import baseConfig from "@/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    ignores: ["src/@types/resources.d.ts"],
  },
];
