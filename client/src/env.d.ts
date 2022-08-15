interface ImportMetaEnv {
  readonly VITE_BASE_SERVER_URL: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_EMAIL_DOMAIN_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
