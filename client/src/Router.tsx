import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import {Services} from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import { Booking } from './pages/Booking';
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
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/privacy-policy", element: <TermsOfService /> },
      { path: "/booking", element: <Booking /> },
    ],
  },
]);

export default router;