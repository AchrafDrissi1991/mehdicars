/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPORT_EMAIL_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
