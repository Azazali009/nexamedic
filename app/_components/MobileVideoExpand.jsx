"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { useNav } from "../_context/NavProvider";

const MobileVideoExpand = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const { setIsVideoFullscreen } = useNav();

  const videoRef = useRef(null);

  useEffect(() => {
    // Hide/show header using context
    setIsVideoFullscreen(isExpanded);
  }, [isExpanded, setIsVideoFullscreen]);

  // 🟢 Update progress as video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent || 0);
    }
  };

  // 🟢 Seek manually on progress bar click
  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  // 🟢 Handle play button (open modal)
  const handlePlay = () => {
    setIsExpanded(true);
    setMuted(false);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setPlaying(true);
      }
    }, 300);
  };

  // Close modal
  const handleClose = () => {
    setIsVideoFullscreen(false);
    setIsExpanded(false);
    setMuted(true);

    // Reset video state
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
  };

  // 🟢 Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      {/* Thumbnail Video */}
      <div className="video-mobile md:hidden relative block w-full">
        <div className="mx-auto flex h-60 w-[85%] items-center justify-center rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted={muted}
            loop
            preload="auto"
            poster="/thumbnail.jpeg"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            style={{ objectFit: "cover" }}
          >
            <source src="/new-main.mp4" type="video/mp4" />
          </video>
          
          {/* Play Button */}
          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={handlePlay}
              className="flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm transition hover:bg-white/30"
              aria-label="Watch video"
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
        </div>
      </div>

      {/* Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black"
          style={{ zIndex: 2147483647 }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f855a] p-2 shadow-lg"
            style={{ zIndex: 2147483647 }}
            aria-label="Close video"
          >
            <span className="text-2xl text-white">×</span>
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            className="h-auto w-auto max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] object-contain"
            playsInline
            muted={muted}
            loop
            preload="auto"
            poster="/thumbnail.jpeg"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            style={{ objectFit: "contain" }}
          >
            <source src="/new-main.mp4" type="video/mp4" />
          </video>

          {/* Controls */}
          <div 
            className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-black/20 px-4 py-2"
            style={{ zIndex: 2147483647 }}
          >
            <button
              onClick={() => {
                togglePlay();
                setUserInteracted(true);
              }}
              className="text-white"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>

            <div
              onClick={handleSeek}
              className="relative h-2 w-64 cursor-pointer overflow-hidden rounded-full bg-black/30"
            >
              <span
                className="absolute top-0 left-0 block h-full bg-white transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={() => setMuted(!muted)}
              className="text-white"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileVideoExpand;
