"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { jemsTabs } from "@/lib/content";

/* "For students / For companies" switch on the JEMS card.
   Full tab semantics: roving tabindex + arrow keys. */
export default function JemsTabs() {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % jemsTabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + jemsTabs.length) % jemsTabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = jemsTabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    btns.current[next]?.focus();
  };

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Who JEMS is for">
        {jemsTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              btns.current[i] = el;
            }}
            role="tab"
            id={`jems-tab-${t.id}`}
            type="button"
            aria-selected={active === i}
            aria-controls={`jems-panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {jemsTabs.map((t, i) => (
        <div
          key={t.id}
          className="tp"
          id={`jems-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`jems-tab-${t.id}`}
          hidden={active !== i}
        >
          <div className="big">{t.big}</div>
          <p className="mut">{t.body}</p>
          <ul className="dots">
            {t.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
