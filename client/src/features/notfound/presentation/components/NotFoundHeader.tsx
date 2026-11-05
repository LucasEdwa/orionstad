import { useTranslation } from 'react-i18next';

export const NotFoundHeader = () => {
  const { t } = useTranslation('common');

  return (
    <>
      {/* Animated 404 with cleaning theme */}
      <div className="mb-8">
        <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-olive to-blue-600 bg-clip-text mb-4 animate-pulse">
          404
        </div>
        <div className="text-6xl mb-4 animate-bounce">
          🧹
        </div>
      </div>

      {/* Main content */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t('notFound.heading')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
          {t('notFound.text')}
        </p>
      </div>
    </>
  );
};
