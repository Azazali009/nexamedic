"use client";
import React, { useState } from "react";

const MobileVideoExpand = ({
  embedId = "wM2AZ7kpNMM",
  thumbnailUrl = "/thumbnail.jpeg",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative block w-full md:hidden">
      <div className="relative mx-auto flex aspect-video items-center justify-center overflow-hidden rounded-xl">
        {isVisible ? (
          <div className="h-full w-full bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${embedId}${isVisible ? "?autoplay=1" : ""}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => setIsVisible(true)}
              id="our-values-video-watch-btn"
              aria-label="Watch video"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="flex items-center justify-center"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileVideoExpand;
