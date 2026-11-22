import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceCardImagesProps {
  images: string[];
  /** Service page the images open */
  href: string;
}

// The card's image area. Several images become a swipeable slideshow
// (CSS scroll snap) with dots to jump between them.
export const ServiceCardImages = memo<ServiceCardImagesProps>(({ images, href }) => {
  const { t } = useTranslation('services');
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative shrink-0">
      <div
        ref={trackRef}
        onScroll={images.length > 1 ? handleScroll : undefined}
        className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <Link
            key={src}
            to={href}
            tabIndex={-1}
            aria-hidden="true"
            className="block w-full shrink-0 snap-start overflow-hidden"
          >
            <img
              src={src}
              alt=""
              width={900}
              height={600}
              loading="lazy"
              draggable={false}
              className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </Link>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={t('ui.showImage', { n: index + 1 })}
              aria-current={index === active}
              className="p-1 cursor-pointer"
            >
              <span
                className={`block h-2 w-2 rounded-full shadow-sm transition-colors ${
                  index === active ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
