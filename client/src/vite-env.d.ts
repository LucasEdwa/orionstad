/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for chat API (`POST {base}/chat`). Highest priority. No trailing slash. */
  readonly VITE_CHAT_API_URL?: string;
  readonly VITE_CHAT_WIDGET_SCRIPT_URL?: string;
  /** Full URL of the cloud-hosted chat UI to embed (iframe panel). */
  readonly VITE_CHAT_URL?: string;
  /** Main header line (e.g. assistant name). */
  readonly VITE_CHAT_TITLE?: string;
  /** Subheader (e.g. company). */
  readonly VITE_CHAT_SUBTITLE?: string;
  /** CTA bubble above the chat launcher; leave unset for built-in Swedish text. */
  readonly VITE_CHAT_LAUNCHER_TEASER?: string;
  /** Set to `false`, `0`, `no`, or `off` to hide the chat widget by default. */
  readonly VITE_CHAT_VISIBLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
