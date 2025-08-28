import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

declare global {
  interface Window {
    tidioIdentify?: (data: any) => void;
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

interface TidioChatProps {
  tidioKey?: string;
}

export const TidioChat: React.FC<TidioChatProps> = ({ 
  tidioKey = import.meta.env.VITE_TIDIO_KEY // Use environment variable
}) => {
  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    // Only load Tidio if we have a valid key and it's not already loaded
    if (!tidioKey || tidioKey === "YOUR_TIDIO_KEY_HERE" || tidioKey === "" || document.getElementById('tidio-script')) {
      console.warn('Tidio: Please set VITE_TIDIO_KEY in your .env.local file');
      return;
    }

    // Create and load Tidio script
    const script = document.createElement('script');
    script.id = 'tidio-script';
    script.src = `//code.tidio.co/${tidioKey}.js`;
    script.async = true;
    
    // Add script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('tidio-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [tidioKey]);

  // Update Tidio language when app language changes
  useEffect(() => {
    if (window.tidioChatApi) {
      // Tidio language mapping
      const tidioLanguageMap: { [key: string]: string } = {
        'en': 'en',
        'es': 'es',
        'sv': 'sv'
      };

      const tidioLang = tidioLanguageMap[language] || 'en';
      
      // You can customize Tidio behavior based on language
      // Note: Tidio automatically detects browser language, but you can override
      console.log(`Setting Tidio language preference to: ${tidioLang}`);
    }
  }, [language]);

  // Optional: Set user identification for better customer support
  useEffect(() => {
    if (window.tidioIdentify) {
      // You can identify users if they're logged in or have provided contact info
      window.tidioIdentify({
        distinct_id: 'visitor', // You can make this dynamic
        email: '', // Add if you have user email
        name: '', // Add if you have user name
        // Add any custom properties
        page_language: language,
        service_interest: 'cleaning_services'
      });
    }
  }, [language]);

  return null; // This component doesn't render anything visible
};
