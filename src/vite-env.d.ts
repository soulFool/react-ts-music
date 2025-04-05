/// <reference types="vite/client" />
import type { AttributifyAttributes } from "@unocss/preset-attributify";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
