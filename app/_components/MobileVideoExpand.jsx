"use client";
import React, { useState, useRef, useEffect } from "react";

const MobileVideoExpand = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Listen for fullscreen exit to close video and return to thumbnail
    const handleFullscreenExit = () => {
      const isFullscreen = document.fullscreenElement || 
                          document.webkitFullscreenElement || 
                          document.webkitDisplayingFullscreen;
      
      if (!isFullscreen && isVisible) {
        // User exited fullscreen, return to thumbnail
        setIsVisible(false);
        video.pause();
        video.currentTime = 0;
      }
    };

    if (isVisible) {
      // Trigger fullscreen immediately on mobile
      setTimeout(() => {
        if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else if (video.requestFullscreen) {
          video.requestFullscreen().catch(() => {});
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen().catch(() => {});
        }
        video.play().catch(() => {});
      }, 100);
      
      // Add listeners for when user exits fullscreen
      video.addEventListener('webkitendfullscreen', handleFullscreenExit);
      document.addEventListener('fullscreenchange', handleFullscreenExit);
      document.addEventListener('webkitfullscreenchange', handleFullscreenExit);
    }

    // Cleanup listeners
    return () => {
      if (video) {
        video.removeEventListener('webkitendfullscreen', handleFullscreenExit);
      }
      document.removeEventListener('fullscreenchange', handleFullscreenExit);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenExit);
    };
  }, [isVisible]);

  return (
    <div className="video-mobile md:hidden relative block w-full py-8">
      <div className="mx-auto flex h-60 w-[85%] items-center justify-center rounded-xl overflow-hidden relative">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          poster="/thumbnail.jpeg"
          muted
          style={{ objectFit: "cover" }}
        >
          <source src="/new-main.mp4" type="video/mp4" />
        </video>
        
        {/* Play Button - matches reel video style */}
        {!isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            id="our-values-video-watch-btn"
            aria-label="Watch video"
          >
            <div id="our-values-video-watch-btn-base"></div>
            <div id="our-values-video-watch-btn-background"></div>
            <svg
              id="our-values-video-watch-btn-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileVideoExpand;
