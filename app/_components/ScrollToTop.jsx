"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait for the new route to mount
    const timer = setTimeout(() => {
      // Scroll immediately (no animation delay)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 300); // slightly longer delay for production hydration

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
