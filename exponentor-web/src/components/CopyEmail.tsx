"use client";

import { useRef, useState } from "react";
import { EMAIL } from "@/lib/content";

/* Email row with a copy button. Falls back to selecting the text if the
   clipboard API is refused. */
export default function CopyEmail() {
  const textRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("Copy");

  const flash = (msg: string) => {
    setLabel(msg);
    window.setTimeout(() => setLabel("Copy"), 1600);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      flash("Copied");
    } catch {
      const el = textRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      flash("Selected");
    }
  };

  return (
    <div className="cr">
      <span className="mono mut">Email</span>
      <span className="v" ref={textRef}>
        {EMAIL}
      </span>
      <button className="copy" type="button" onClick={copy} aria-live="polite">
        {label}
      </button>
    </div>
  );
}
