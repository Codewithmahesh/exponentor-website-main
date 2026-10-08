"use client";

import { useEffect } from "react";

/* Scroll-reveal for the whole page. Sections stay server-rendered; this adds
   the `.in` class to anything marked for reveal once it enters the viewport.
   CSS (globals.css) does the actual animating. Renders nothing. */
const SELECTOR = ".rv,.track,.bar,#dash,.p3>div";

export default function Motion() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return null;
}
