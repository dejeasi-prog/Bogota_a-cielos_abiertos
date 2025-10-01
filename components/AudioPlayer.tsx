import React, { useState, useRef, useEffect } from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

interface AudioPlayerProps {
  src: string;
  small?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, small = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
        const progressBar = e.currentTarget;
        const clickPositionX = e.nativeEvent.offsetX;
        const barWidth = progressBar.offsetWidth;
        
        if (barWidth > 0) {
            const seekTime = (clickPositionX / barWidth) * duration;
            audioRef.current.currentTime = seekTime;
        }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (small) {
    return (
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
        <audio ref={audioRef} src={src} preload="metadata" />
        <button
          onClick={togglePlayPause}
          className="text-amber-500 hover:text-amber-600 transition-colors flex-shrink-0"
          aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
        <div 
            onClick={handleProgressClick}
            className="w-full bg-gray-300 rounded-full h-1.5 cursor-pointer"
        >
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg border border-gray-200">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={togglePlayPause}
        className="text-amber-500 hover:text-amber-600 transition-colors"
        aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
      >
        {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
      </button>
      <div className="flex-1 flex items-center space-x-2">
        <span className="text-xs text-gray-600 w-10 text-center">{formatTime(currentTime)}</span>
        <div 
            onClick={handleProgressClick}
            className="w-full bg-gray-300 rounded-full h-1.5 cursor-pointer"
        >
          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-xs text-gray-600 w-10 text-center">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;