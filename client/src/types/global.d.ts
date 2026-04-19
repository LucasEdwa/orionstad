declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    tidioIdentify?: (data: Record<string, string>) => void;
    tidioChatApi?: {
      display: (show: boolean) => void;
      open: () => void;
      close: () => void;
      hide: () => void;
      show: () => void;
      setColorScheme: (scheme: string) => void;
    };
  }
}

export {};
