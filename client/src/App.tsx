import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import i18n from './i18n';
import { Toaster } from 'sonner';
import { CloudChat, DEFAULT_LAUNCHER_TEASER } from './components/CloudChat';

const TOAST_THEME = {
  '--normal-bg': '#fffaf5',
  '--normal-border': '#d2b093',
  '--normal-text': '#3C0C0C',
} as CSSProperties;

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
      {/* Orion colours; accents for success/error live in index.css */}
      <Toaster position="top-right" closeButton style={TOAST_THEME} />
      {children}
      <CloudChat launcherTeaser={DEFAULT_LAUNCHER_TEASER} />
    </>
  );
}
export default App
