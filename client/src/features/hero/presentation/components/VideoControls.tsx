import { memo } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VideoControlsProps {
  isVideoPlaying: boolean;
  isMuted: boolean;
  onToggleVideo: () => void;
  onToggleMute: () => void;
}

export const VideoControls = memo<VideoControlsProps>(({
  isVideoPlaying,
  isMuted,
  onToggleVideo,
  onToggleMute,
}) => {
  return (
    <div className="absolute top-6 right-6 z-30 flex space-x-3">
      <button
        onClick={onToggleVideo}
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
        onClick={onToggleMute}
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
  );
});
