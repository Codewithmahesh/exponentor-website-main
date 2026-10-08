"use client";

import { useEffect, useRef, useState } from "react";

type Props = { to: number; decimals?: number };

/* Counts up from 0 the first time it scrolls into view.
   Server and no-JS render the final number. */
export default function Counter({ to, decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let t0: number | null = null;
        const step = (ts: number) => {
          if (t0 === null) t0 = ts;
          const p = Math.min(1, (ts - t0) / 1500);
          setValue(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="count">
      {value.toFixed(decimals)}
    </span>
  );
}
