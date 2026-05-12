declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    CHATBOT_API_URL?: string;
    CHATBOT_API_KEY?: string;
    CHATBOT_NAME?: string;
    CHATBOT_GREETING?: string;
  }
}

export {};
