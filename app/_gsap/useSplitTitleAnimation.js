"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const useSplitTitleAnimation = ({
  trigger,
  titleSelector,
  start = "top 50%",
  end = "bottom 20%",
  direction = "left", // or "right", "top", "bottom"
  duration = 1.8,
  stagger = 0.02,
}) => {
  useGSAP(() => {
    // Don't run animation on mobile devices
    if (window.innerWidth < 768) {
      return;
    }

    // Don't run animation if trigger or titleSelector is null
    if (!trigger || !titleSelector) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,

        // markers: true,
        toggleActions: "restart none restart none",
        // toggleActions: "play reverse play reverse", // ✅ animate in & out
      },
    });

    const title = new SplitText(titleSelector, { type: "lines, words" });
    // ✅ Fix: make sure wrappers don't clip hidden words
    gsap.set(title.lines, { overflow: "visible" });
    gsap.set(title.words, { overflow: "visible" });
    const animationProps = {
      opacity: 0,
      duration,
      ease: "expo.out",
      stagger,
    };

    if (direction === "left") animationProps.xPercent = -100;
    else if (direction === "right") animationProps.xPercent = 100;
    else if (direction === "top") animationProps.yPercent = -100;
    else if (direction === "bottom") animationProps.yPercent = 100;

    tl.from(title.words, animationProps);
  }, [trigger, titleSelector]);
};
