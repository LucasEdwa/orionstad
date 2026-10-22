import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import i18n from './i18n';
import { Toaster } from 'sonner';
import { CloudChat, DEFAULT_LAUNCHER_TEASER } from './components/CloudChat';

// The router is passed in as children: a browser router on the client,
// a static router when prerendering at build time.
function App({ children }: { children: ReactNode }) {
  const language = useSelector((state: RootState) => state.language.language);
useEffect(() => {
  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }
  localStorage.setItem("language", language);
}, [language]);
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      {children}
      <CloudChat launcherTeaser={DEFAULT_LAUNCHER_TEASER} />
    </>
  );
}
export default App
