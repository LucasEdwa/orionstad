import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Booking = lazy(() => import('./pages/Booking').then(m => ({ default: m.Booking })));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#6b4c3b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "/services", element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: "/about", element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: "/contact", element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: "/terms-of-service", element: <Suspense fallback={<PageLoader />}><TermsOfService /></Suspense> },
      { path: "/privacy-policy", element: <Navigate to="/terms-of-service" replace /> },
      { path: "/booking", element: <Suspense fallback={<PageLoader />}><Booking /></Suspense> },
    ],
  },
]);

export default router;