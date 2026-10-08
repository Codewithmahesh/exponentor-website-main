"use client";

import { useEffect, useRef } from "react";

/* The thin orange bar under the nav that fills as you scroll. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const h = doc.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="prog" ref={ref} aria-hidden="true" />;
}
