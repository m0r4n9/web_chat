/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_PRODUCTION: boolean;
  readonly VITE_PROD_API_URL: string;
  readonly VITE_DEV_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
