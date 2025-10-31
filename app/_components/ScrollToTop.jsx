"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use timeout to ensure it runs after new content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // or "smooth"
        });
      }, 100);
    }
  }, [pathname]);

  return null;
}
