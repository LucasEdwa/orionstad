import { NotFound as NotFoundFeature } from '../features/notfound';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found" noindex />
      <NotFoundFeature />
    </>
  );
};