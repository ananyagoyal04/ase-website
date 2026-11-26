import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { siteContent } from '../data/content';

export function BackgroundVideo() {
  const { videoMp4, poster } = siteContent.home.hero;
  const prefersReducedMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || videoError) return;
    const video = videoRef.current;
    if (!video) return;

    const ensurePlay = () => {
      if (document.hidden) return;
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        video.play().catch(() => {});
      }
    };

    video.play().catch(() => {});
    video.addEventListener('pause', ensurePlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('stalled', ensurePlay);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('pause', ensurePlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('stalled', ensurePlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [prefersReducedMotion, videoError]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#07090C]"
    >
      {prefersReducedMotion || videoError ? (
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover object-[56%_center] md:object-center"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover object-[56%_center] md:object-center"
        >
          <source src={videoMp4} type="video/mp4" />
        </video>
      )}

      {/* Readability Layer: ~60% Obsidian base + radial vignette + top/bottom edge gradient */}
      <div className="absolute inset-0 bg-[#07090C]/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 25%, rgba(7, 9, 12, 0.58) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090C]/75 via-transparent to-[#07090C]/85" />
    </div>
  );
}
