

import { useEffect, useState } from 'react';
import orionLogo from '../../assets/orion-logo.png';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  onLogoAnimationEnd: () => void;
}


const Hero: React.FC<HeroProps> = ({ onLogoAnimationEnd }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const { t } = useTranslation('home');

  useEffect(() => {
    setLogoVisible(true);
    const timer = setTimeout(() => {
      setLogoVisible(false);
      setTimeout(() => {
        setShowLogo(false);
        onLogoAnimationEnd();
      }, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLogoAnimationEnd]);

  // Helper for logo animation with swipe up effect
  const LogoAnimation = () => (
    <img
      src={orionLogo}
      alt="Orion Logo"
      className={`transition-all duration-1000 rounded-full w-48 h-48 object-contain z-30 ${logoVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 -translate-y-32'}`}
      style={{ filter: 'drop-shadow(0 0 40px #c09cc1)' }}
    />
  );

  // Helper for hero content after logo
  const HeroContent = () => (
    <>
      <video
        src="https://amplify-d2gt0za7za73zb-ma-modelintrospectionschema-qthe560p7lyj.s3.eu-north-1.amazonaws.com/6195525-uhd_3840_2160_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />
      <header className="w-full absolute top-70 left-0 z-20">
        <div className="px-4 py-6 items-center">
          <div className="rounded-lg px-6 py-4 animate-fadeInUp flex justify-center flex-col items-center ">
            <h1 className="text-3xl font-bold text-center xl:text-6xl text-[#333333] animate-fadeInUp delay-200 drop-shadow-md">{t("hero.welcome")}</h1>
            <p className="text-lg text-center mt-2 font-semibold xl:text-2xl text-[#333333] animate-fadeInUp delay-400 drop-shadow-sm">{t("hero.subtitle")}</p>
          </div>
          <div className="mt-8 flex justify-center items-center animate-fadeInUp delay-500">
            <button
              className="bg-orion-gradient text-gray-800 px-8 py-3 rounded-full shadow-lg hover:bg-[#8e77ad] transition-colors w-[200px] max-w-xs text-lg font-semibold animate-fadeInUp delay-600"
              onClick={() => {
                const el = document.getElementById("booking");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={t("hero.bookNow")}
            >
              {t("hero.bookNow")}
            </button>
          </div>
        </div>
      </header>
    </>
  );

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Logo animation */}
      {showLogo ? <LogoAnimation /> : <HeroContent />}
    </div>
  );
};

export default Hero;
