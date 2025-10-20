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
  const scrollRef = useRef({ y: 0, applied: false });
  const prevEnvRef = useRef({
    htmlBg: "",
    bodyBg: "",
    mobileBg: "",
    sectionBg: "",
    themeColor: "",
  });

  useEffect(() => {
    // Hide/show header using context
    setIsVideoFullscreen(isExpanded);

    // 🟢 Change theme color & backgrounds while preserving previous values
    const color = "#000000";
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    const videoMobile = document.querySelector(".video-mobile");
    const videoSection = document.querySelector(".video-section");

    if (isExpanded) {
      // save previous
      prevEnvRef.current.htmlBg = document.documentElement.style.backgroundColor || "";
      prevEnvRef.current.bodyBg = document.body.style.backgroundColor || "";
      prevEnvRef.current.mobileBg = videoMobile ? videoMobile.style.backgroundColor : "";
      prevEnvRef.current.sectionBg = videoSection ? videoSection.style.backgroundColor : "";
      prevEnvRef.current.themeColor = metaThemeColor.getAttribute("content") || "";

      // apply dark env
      metaThemeColor.setAttribute("content", color);
      const parent = metaThemeColor.parentNode;
      parent.removeChild(metaThemeColor);
      parent.appendChild(metaThemeColor);

      document.documentElement.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
      if (videoMobile) videoMobile.style.backgroundColor = color;
      if (videoSection) videoSection.style.backgroundColor = color;
    } else {
      // restore previous precisely
      metaThemeColor.setAttribute("content", prevEnvRef.current.themeColor);
      const parent = metaThemeColor.parentNode;
      parent.removeChild(metaThemeColor);
      parent.appendChild(metaThemeColor);

      document.documentElement.style.backgroundColor = prevEnvRef.current.htmlBg;
      document.body.style.backgroundColor = prevEnvRef.current.bodyBg;
      if (videoMobile) videoMobile.style.backgroundColor = prevEnvRef.current.mobileBg;
      if (videoSection) videoSection.style.backgroundColor = prevEnvRef.current.sectionBg;
    }
    // 🔒 Robust scroll lock on mobile (iOS-safe)
    const preventDefault = (e) => {
      e.preventDefault();
    };

    try {
      if (isExpanded && !scrollRef.current.applied) {
        const y = window.scrollY || window.pageYOffset || 0;
        scrollRef.current.y = y;
        scrollRef.current.applied = true;

        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.overscrollBehavior = "none";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${y}px`;
        document.body.style.width = "100%";
        document.body.style.touchAction = "none";

        window.addEventListener("wheel", preventDefault, { passive: false });
        window.addEventListener("touchmove", preventDefault, { passive: false });
      }

      if (!isExpanded && scrollRef.current.applied) {
        const y = scrollRef.current.y || 0;
        document.documentElement.style.overflow = "";
        document.documentElement.style.overscrollBehavior = "";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";

        window.removeEventListener("wheel", preventDefault);
        window.removeEventListener("touchmove", preventDefault);
        window.scrollTo(0, y);
        scrollRef.current.applied = false;
      }
    } catch (_) {}

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
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

  // 🟢 Handle play button (open overlay)
  // Open overlay and autoplay
  const handlePlay = () => {
    setIsExpanded(true);
    setMuted(false);

    // lock scroll immediately on open
    try {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } catch (_) {}

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setPlaying(true);
      }
    }, 300);
  };

  // Close overlay and return to thumbnail mode (paused)
  const handleClose = () => {
    // Immediately restore header
    setIsVideoFullscreen(false);

    // Collapse overlay
    setIsExpanded(false);
    setMuted(true);

    // Reset video state
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);

    // restore scroll
    try {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    } catch (_) {}

    // theme restoration is handled in the isExpanded effect
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
    <div
      className={`video-mobile md:hidden ${isExpanded ? "fixed inset-0 z-[101] flex items-center justify-center bg-black" : "relative block w-full"}`}
    >
      <div
        className={`${isExpanded ? "relative z-[102] h-auto max-h-screen w-full" : "mx-auto flex h-60 w-[85%] items-center justify-center rounded-xl"} overflow-hidden`}
      >
        <video
          ref={videoRef}
          className={`${isExpanded ? "h-auto max-h-screen w-full object-contain pointer-events-none" : "h-full w-full object-cover"}`}
          playsInline
          muted={muted}
          loop
          preload="auto"
          poster="/thumbnail.jpeg"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src="/new-main.mp4" type="video/mp4" />
        </video>
        {/* ▶️ Play Button */}
        {!isExpanded && (
          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              id="home-reel-video-watch-btn"
              aria-label="Watch reel button"
              onClick={handlePlay}
              className="flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm transition hover:bg-white/30"
            >
              <div id="home-reel-video-watch-btn-base"></div>{" "}
              <div id="home-reel-video-watch-btn-background"></div>{" "}
              <svg
                id="home-reel-video-watch-btn-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 36 36"
              >
                {" "}
                <path
                  fill="currentColor"
                  d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"
                ></path>{" "}
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 📱 Fullscreen Overlay */}
      {isExpanded && (
        <>
          {/* Transparent backdrop that doesn't capture events */}
          <div className="fixed inset-0 z-[100000] pointer-events-none" />
          {/* ❌ Close Button in a Portal to escape any stacking/transform issues */}
          {typeof window !== "undefined" &&
            createPortal(
              <button
                onClick={handleClose}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                className="fixed top-6 right-6 z-[2147483647] pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2f855a] p-2 shadow-lg active:scale-95"
                type="button"
                aria-label="Close video"
              >
                <span className="text-2xl leading-none text-white">×</span>
              </button>,
              document.body,
            )}

          {/* 🎥 Video */}

          {/* 🎚 Custom Controls */}
          <div className="absolute bottom-8 left-1/2 z-[103] flex -translate-x-1/2 items-center gap-4 rounded-lg bg-white/30 px-4 py-2 backdrop-blur-sm">
            {/* Play / Pause */}
            <button
              onClick={() => {
                togglePlay();
                setUserInteracted(true);
              }}
              className="text-white transition-opacity hover:opacity-80"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>

            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              className="relative h-2 w-64 cursor-pointer overflow-hidden rounded-full bg-black/30"
            >
              <span
                className="absolute top-0 left-0 block h-full bg-white transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Volume */}
            <button
              onClick={() => setMuted(!muted)}
              className="text-white transition-opacity hover:opacity-80"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileVideoExpand;
