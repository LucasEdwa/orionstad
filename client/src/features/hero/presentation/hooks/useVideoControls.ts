import { useState } from 'react';

export const useVideoControls = (isVideoPlaying: boolean, setIsVideoPlaying: (playing: boolean) => void, isMuted: boolean, setIsMuted: (muted: boolean) => void) => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

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

  return {
    videoRef,
    setVideoRef,
    toggleVideo,
    toggleMute,
  };
};
