import React, { useEffect, useState } from 'react';


import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  title: string;
  contents: any[];
  images: string[];
  i18nNs?: string; // optional i18n namespace
}


export const ServiceCard: React.FC<ServiceCardProps> = ({ title, contents, images, i18nNs = 'services' }) => {
  const { t } = useTranslation(i18nNs);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300 border border-gray-100">
      <div className="relative w-full h-56 mb-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={t(title) + ' image ' + (i + 1)}
            className={`w-full h-56 object-cover rounded-xl shadow-md absolute top-0 left-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ transition: 'opacity 0.7s' }}
          />
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === current ? 'bg-[#6d3a7b]' : 'bg-gray-300'} inline-block`}
              />
            ))}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2 text-[#6d3a7b] text-center">{t(title)}</h2>
      {contents?.map((content: any, i: number) =>
        content.type === "text" ? (
          <p className="text-gray-700 mb-3 text-center" key={i}>
            {content.label && (
              <span className="font-bold text-lg">{t(content.label)} </span>
            )}
            {t(content.text)}
          </p>
        ) : (
          <ul className="list-disc pl-5 mb-3 text-left" key={i}>
            {content.items?.map((item: string, j: number) => (
              <li key={j}>{t(item)}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};
