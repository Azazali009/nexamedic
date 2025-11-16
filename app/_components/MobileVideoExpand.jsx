"use client";
import React, { useState, useRef, useEffect } from "react";

const MobileVideoExpand = ({
  embedId = "OB_etu7bBqc",
  thumbnailUrl = "https://img.youtube.com/vi/OB_etu7bBqc/sddefault.jpg",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!isVisible) return;

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: embedId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 1, // Enable fullscreen button
          playsinline: 0 // iOS fullscreen
        },
        events: {
          onReady: (event) => {
            // Player is ready
          }
        }
      });
    };
  }, [isVisible, embedId]);

  return (
    <div className="relative w-full hidden max-[1024px]:block">
      <div className="relative mx-auto flex aspect-video items-center justify-center overflow-hidden rounded-xl">
        {isVisible ? (
          <div id="youtube-player" className="h-full w-full"></div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => setIsVisible(true)}
              aria-label="Watch video"
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <svg
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileVideoExpand;