import { useState, useRef, useCallback } from 'react';

export const useVideoControls = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
  }, []);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play().catch(() => setHasError(true));
    }
    setIsVideoPlaying((prev) => !prev);
  }, [isVideoPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted((prev) => !prev);
  }, [isMuted]);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsVideoPlaying(false);
  }, []);

  return {
    isVideoPlaying,
    isMuted,
    hasError,
    setVideoRef,
    toggleVideo,
    toggleMute,
    handleVideoError,
  };
};
