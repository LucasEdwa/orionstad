

import { useEffect, useState } from 'react';
import orionLogo from '../../assets/orionPride.jpeg';
import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface HeroProps {
  onLogoAnimationEnd: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogoAnimationEnd }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const { t } = useTranslation('home');

  useEffect(() => {
    setLogoVisible(true);
    const timer = setTimeout(() => {
      setLogoVisible(false);
      setTimeout(() => {
        setShowLogo(false);
        onLogoAnimationEnd();
      }, 600);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLogoAnimationEnd]);

  const toggleVideo = () => {
    if (videoRef) {
      if (isVideoPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContent = () => {
    const element = document.querySelector('main');
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Enhanced logo animation with modern effects
  const LogoAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`relative transition-all duration-1000 ease-out ${logoVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-20'}`}>
        <img
          src={orionLogo}
          alt="Orion Städ Logo"
          className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover shadow-2xl border-4 border-white/30"
          style={{ 
            filter: 'drop-shadow(0 0 60px rgba(192, 156, 193, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))'
          }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/20 to-transparent"></div>
      </div>
      
      <div className={`text-center transition-all duration-1000 delay-300 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Orion Städ
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md">
          Where cleaning becomes caring
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Enhanced video background */}
      <video
        ref={setVideoRef}
        src="https://amplify-d2gt0za7za73zb-ma-modelintrospectionschema-qthe560p7lyj.s3.eu-north-1.amazonaws.com/6195525-uhd_3840_2160_25fps.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent z-10"></div>

      {/* Video controls */}
      {!showLogo && (
        <div className="absolute top-6 right-6 z-30 flex space-x-3">
          <button
            onClick={toggleVideo}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 group"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? (
              <FaPause className="w-4 h-4 group-hover:scale-110 transition-transform" />
            ) : (
              <FaPlay className="w-4 h-4 group-hover:scale-110 transition-transform ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 group"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <FaVolumeMute className="w-4 h-4 group-hover:scale-110 transition-transform" />
            ) : (
              <FaVolumeUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      )}

      {/* Main content */}
      {showLogo ? (
        <LogoAnimation />
      ) : (
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
          {/* Enhanced hero content */}
          <div className="text-center">
            <div className="animate-fadeInUp">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {t("hero.welcome")}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-fadeInUp delay-200">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-400">
              <button
                onClick={scrollToBooking}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 text-lg font-semibold min-w-[200px] group"
                aria-label={t("hero.bookNow")}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{t("hero.bookNow")}</span>
                  <FaArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={scrollToContent}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 text-lg font-semibold min-w-[200px] group"
                aria-label="Learn more about us"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <FaArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 animate-fadeInUp delay-600">
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm md:text-base">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm md:text-base">5-Star Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm md:text-base">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={scrollToContent}
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Scroll down"
            >
              <FaArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced particles effect */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
