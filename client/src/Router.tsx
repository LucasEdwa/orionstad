import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import {Services} from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Layout />
    ),
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      {path: "/services", element: <Services /> },
      {path: "/about", element: <About /> },
      {path: "/contact", element: <Contact /> },

    ],
  },
]);

export default router;