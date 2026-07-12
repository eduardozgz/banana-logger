/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SKIP_ENV_VALIDATION?: string;
  readonly VITE_DISCORD_CLIENT_ID?: string;
  readonly VITE_SUPPORT_URL?: string;
  readonly VITE_BOT_REPO_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
