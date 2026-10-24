import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';
import { PageLoader } from './components/PageLoader';
import { SERVICE_IDS } from './features/services/domain/serviceIds';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.ServiceDetail })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Booking = lazy(() => import('./pages/Booking').then(m => ({ default: m.Booking })));

// Shared by the browser router (main.tsx) and the build-time prerenderer (entry-server.tsx)
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "/services", element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: "/services/:serviceId", element: <Suspense fallback={<PageLoader />}><ServiceDetail /></Suspense> },
      { path: "/about", element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: "/contact", element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: "/terms-of-service", element: <Suspense fallback={<PageLoader />}><TermsOfService /></Suspense> },
      { path: "/privacy-policy", element: <Navigate to="/terms-of-service" replace /> },
      { path: "/booking", element: <Suspense fallback={<PageLoader />}><Booking /></Suspense> },
    ],
  },
];

// Paths prerendered to static HTML at build time
export const PRERENDER_PATHS = [
  '/', '/services', '/about', '/contact', '/booking', '/terms-of-service',
  ...SERVICE_IDS.map((id) => `/services/${id}`),
];