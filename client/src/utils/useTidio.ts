import { useCallback } from 'react';

export const useTidio = () => {
  const openChat = useCallback(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  }, []);

  const closeChat = useCallback(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.close();
    }
  }, []);

  const hideChat = useCallback(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.hide();
    }
  }, []);

  const showChat = useCallback(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.show();
    }
  }, []);

  const setColorScheme = useCallback((scheme: 'light' | 'dark' | 'auto') => {
    if (window.tidioChatApi) {
      window.tidioChatApi.setColorScheme(scheme);
    }
  }, []);

  return {
    openChat,
    closeChat,
    hideChat,
    showChat,
    setColorScheme
  };
};
