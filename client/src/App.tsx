
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import i18n from './i18n';
import { Toaster } from 'sonner';
import { CloudChat, DEFAULT_LAUNCHER_TEASER } from './components/CloudChat';



function App() {
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
      <RouterProvider router={router} />
      <CloudChat launcherTeaser={DEFAULT_LAUNCHER_TEASER} />
    </>
  );
}
export default App