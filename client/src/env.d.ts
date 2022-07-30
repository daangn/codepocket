interface ImportMetaEnv {
  readonly VITE_BASE_SERVER_URL_DEV: string;
  readonly VITE_BASE_SERVER_URL_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
