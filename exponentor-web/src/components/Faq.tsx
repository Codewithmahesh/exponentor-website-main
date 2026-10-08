"use client";

import { useState } from "react";
import { faq } from "@/lib/content";

/* Accordion. Several answers can be open at once; the first starts open. */
export default function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      {faq.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div className={isOpen ? "q open" : "q"} key={item.q}>
            <button
              className="qh"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              id={`faq-q-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{item.q}</span>
              <i />
            </button>
            <div
              className="qa"
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
            >
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
