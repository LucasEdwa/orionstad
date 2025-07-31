
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import i18n from './i18n';



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
      <RouterProvider router={router} />
    </>
  );
}
export default App