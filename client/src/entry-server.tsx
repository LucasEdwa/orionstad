// Build-time renderer: scripts/prerender.mjs calls render() for every path
// in PRERENDER_PATHS and writes the result into dist/ as static HTML.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import App from './App';
import { routes, PRERENDER_PATHS } from './routes';
import { store } from './store';
import './i18n';

export { PRERENDER_PATHS };

const handler = createStaticHandler(routes);

export async function render(path: string): Promise<{ html: string; status: number }> {
  const context = await handler.query(new Request(`http://localhost${path}`));
  if (context instanceof Response) {
    throw new Error(`Route ${path} returned a redirect; it should not be prerendered`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);

  // prerenderToNodeStream waits for every lazy page chunk to resolve,
  // so the output contains the real page content, not the Suspense spinner.
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <App>
            <StaticRouterProvider router={router} context={context} hydrate={false} />
          </App>
        </Provider>
      </HelmetProvider>
    </StrictMode>,
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;
  return { html, status: context.statusCode };
}
