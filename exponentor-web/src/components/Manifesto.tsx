"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { manifesto } from "@/lib/content";

/* The orange manifesto sheet. Words light up one by one as you scroll through it. */

type Word = { word: string; em: boolean };

const words: Word[] = manifesto.flatMap((seg) =>
  seg.text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({ word, em: seg.em })),
);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(words.length); // everything readable until JS measures

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stays fully lit

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.78 - r.top) / (r.height * 0.75)));
      setLit(Math.round(p * words.length * 1.12));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Group consecutive words back into their <em> / plain runs so the serif accent survives.
  const runs: { em: boolean; items: { word: string; i: number }[] }[] = [];
  words.forEach((w, i) => {
    const last = runs[runs.length - 1];
    if (last && last.em === w.em) last.items.push({ word: w.word, i });
    else runs.push({ em: w.em, items: [{ word: w.word, i }] });
  });

  return (
    <section className="mani" id="manifesto" aria-label="Manifesto" ref={sectionRef}>
      <div className="wrap">
        <span className="qm" aria-hidden="true">
          &ldquo;
        </span>
        <span className="pill">Manifesto — our belief</span>
        <p className="mani-t" id="maniT">
          {runs.map((run, ri) => {
            const content = run.items.map(({ word, i }, wi) => (
              <Fragment key={i}>
                {wi > 0 && " "}
                <span className={i < lit ? "w on" : "w"}>{word}</span>
              </Fragment>
            ));
            return (
              <Fragment key={ri}>
                {ri > 0 && " "}
                {run.em ? <em>{content}</em> : content}
              </Fragment>
            );
          })}
        </p>
        <p className="mani-by mono">The Exponentor manifesto</p>
      </div>
    </section>
  );
}
