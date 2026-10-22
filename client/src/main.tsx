import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { routes } from './routes'
import { Provider } from "react-redux";
import { store } from "./store";
import "./i18n";

const router = createBrowserRouter(routes);

const app = (
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App>
          <RouterProvider router={router} />
        </App>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  // Page was prerendered at build time. The head tags it shipped for crawlers
  // are dropped here so React's own <title>/<meta> become the only copies.
  document.head.querySelectorAll('[data-prerender]').forEach((node) => node.remove());
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
