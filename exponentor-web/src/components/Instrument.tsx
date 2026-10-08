"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";

/* "The cost of a surprise" — an interactive model of how the cost of fixing a
   budget overrun grows the longer it goes unseen. Illustrative, not client data.
   cost(m) follows an exponential curve: f(t) = (e^(k t) - 1) / (e^k - 1), t = (m-1)/11. */

const K = 3.2;
const MONTHS = 12;
const f = (m: number) =>
  (Math.exp((K * (m - 1)) / (MONTHS - 1)) - 1) / (Math.exp(K) - 1);

const clamp = (m: number) => Math.max(1, Math.min(MONTHS, m));
const pad2 = (n: number) => String(Math.round(n)).padStart(2, "0");

type Verdict = { pill: string; label: string; text: string };

function verdict(m: number): Verdict {
  if (m <= 3.5)
    return {
      pill: "pill st live",
      label: "Caught early",
      text: "XSITE flags the overrun while the fix is still a change order.",
    };
  if (m <= 6.5)
    return {
      pill: "pill st",
      label: "Drifting",
      text: "The gap is widening. Every new invoice makes it harder to unwind.",
    };
  return {
    pill: "pill st alert",
    label: "Found too late",
    text: "The budget is spent. The fix is now a crisis.",
  };
}

export default function Instrument() {
  const colRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);

  const [width, setWidth] = useState(900);
  const [month, setMonth] = useState(2);

  const interacted = useRef(false);
  const raf = useRef(0);
  const dragging = useRef(false);
  const introPlayed = useRef(false);
  const timers = useRef<number[]>([]);

  /* ---- geometry (all derived from the measured width) ---- */
  const g = useMemo(() => {
    const W = Math.max(280, width);
    const H = Math.round(Math.min(470, Math.max(250, W * 0.4)));
    const small = W < 560;
    const L = small ? 20 : 40;
    const R = W - (small ? 16 : 24);
    const T = 24;
    const B = H - 40;
    const X = (m: number) => L + ((m - 1) / (MONTHS - 1)) * (R - L);
    const Y = (m: number) => B - f(m) * (B - T - 28);

    const pts: string[] = [];
    for (let m = 1; m <= MONTHS + 0.001; m += 0.1)
      pts.push(`${X(m).toFixed(1)} ${Y(m).toFixed(1)}`);
    const line = `M${pts.join(" L ")}`;
    const area = `${line} L ${X(MONTHS).toFixed(1)} ${B} L ${X(1).toFixed(1)} ${B} Z`;

    return { W, H, small, L, R, T, B, X, Y, line, area };
  }, [width]);

  /* ---- measure the chart column ---- */
  useEffect(() => {
    const col = colRef.current;
    if (!col) return;
    const measure = () => setWidth(Math.round(col.clientWidth - 24));
    measure();
    if (!("ResizeObserver" in window)) return;
    let last = col.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(col.clientWidth - last) > 2) {
        last = col.clientWidth;
        measure();
      }
    });
    ro.observe(col);
    return () => ro.disconnect();
  }, []);

  /* ---- animation helpers ---- */
  const stop = useCallback(() => {
    interacted.current = true;
    cancelAnimationFrame(raf.current);
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const tween = useCallback((a: number, b: number, ms: number, done?: () => void) => {
    let t0: number | null = null;
    const step = (ts: number) => {
      if (interacted.current) return;
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / ms);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setMonth(a + (b - a) * e);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else done?.();
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  /* ---- intro: draw the curve once, then demo the scrub (until the visitor touches it) ---- */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const play = () => {
      if (introPlayed.current) return;
      introPlayed.current = true;
      const c = curveRef.current;
      const a = areaRef.current;
      const mk = markerRef.current;
      if (!c || !a || !mk) return;

      const len = c.getTotalLength();
      c.style.strokeDasharray = String(len);
      c.style.strokeDashoffset = String(len);
      a.style.opacity = "0";
      mk.style.opacity = "0";
      void c.getBoundingClientRect(); // commit start state
      c.style.transition = "stroke-dashoffset 1.9s cubic-bezier(.3,.6,.2,1)";
      a.style.transition = "opacity 1s ease .9s";
      mk.style.transition = "opacity .4s ease 1.6s";
      c.style.strokeDashoffset = "0";
      a.style.opacity = "1";
      mk.style.opacity = "1";

      timers.current.push(
        window.setTimeout(() => {
          c.style.strokeDasharray = "none";
        }, 2000),
        window.setTimeout(() => {
          if (interacted.current) return;
          tween(2, 7, 1500, () => {
            timers.current.push(
              window.setTimeout(() => tween(7, 2, 1300), 1400),
            );
          });
        }, 2500),
      );
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(panel);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [tween]);

  /* ---- pointer scrubbing ---- */
  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) * (g.W / r.width);
    setMonth(clamp(1 + ((x - g.L) / (g.R - g.L)) * (MONTHS - 1)));
  };

  const m = clamp(month);
  const x = g.X(m);
  const y = g.Y(m);
  const idx = 1 + 19 * f(m);
  const v = verdict(m);

  const ticks = [];
  for (let i = 1; i <= MONTHS; i++) {
    ticks.push(
      <g key={i}>
        <line className="g" x1={g.X(i)} x2={g.X(i)} y1={g.T} y2={g.B} />
        {(g.W >= 700 || i % 2 === 1 || i === MONTHS) && (
          <text className="tick" x={g.X(i)} y={g.B + 24} textAnchor="middle">
            M{pad2(i)}
          </text>
        )}
      </g>,
    );
  }

  return (
    <div className="panel" id="panel" ref={panelRef}>
      <div className="panel-h mono">
        <span>The cost of a surprise — drag to scrub</span>
        <span>Months 1–12 of a build</span>
      </div>
      <div className="panel-b">
        <div className="chartcol" ref={colRef}>
          <svg
            id="chart"
            ref={svgRef}
            viewBox={`0 0 ${g.W} ${g.H}`}
            style={{ height: g.H }}
            role="img"
            aria-label="Curve showing how the cost of fixing a budget overrun grows with every month it goes unnoticed"
            onPointerDown={(e) => {
              stop();
              dragging.current = true;
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                /* pointer capture is optional */
              }
              fromPointer(e);
            }}
            onPointerMove={(e) => dragging.current && fromPointer(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FF4A1C" stopOpacity=".38" />
                <stop offset="1" stopColor="#FF4A1C" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect
              className="zone"
              x={g.X(1)}
              y={g.T}
              width={g.X(3.5) - g.X(1)}
              height={g.B - g.T}
            />
            {ticks}
            <text className="anno s" x={g.X(1) + 8} y={g.T + 16}>
              {g.small ? "ALERT" : "XSITE ALERT WINDOW"}
            </text>
            <line
              className="flag"
              x1={g.X(7)}
              x2={g.X(7)}
              y1={g.T + 26}
              y2={g.Y(7)}
            />
            <text
              className="anno"
              x={g.X(7) - 8}
              y={g.T + 34}
              textAnchor="end"
            >
              {g.small ? "USUAL" : "USUALLY DISCOVERED HERE"}
            </text>
            <line className="base" x1={g.L} x2={g.R} y1={g.B} y2={g.B} />
            <path ref={areaRef} className="area" d={g.area} fill="url(#ag)" />
            <path ref={curveRef} className="curve" d={g.line} />
            <g className="mkr" ref={markerRef}>
              <line className="drop" x1={x} x2={x} y1={y} y2={g.B} />
              <circle className="ring" cx={x} cy={y} r={17} />
              <circle className="dot" cx={x} cy={y} r={8} />
            </g>
          </svg>

          <div className="scrub">
            <label className="mono" htmlFor="month">
              Month
            </label>
            <input
              id="month"
              type="range"
              min={1}
              max={MONTHS}
              step={0.1}
              value={m}
              aria-label="Month in which the overrun is discovered"
              onChange={(e) => {
                stop();
                setMonth(clamp(parseFloat(e.target.value)));
              }}
            />
          </div>
          <p className="fine">
            Illustrative model of how correction cost grows the longer an overrun
            goes unseen. Not client data.
          </p>
        </div>

        <div className="read" aria-live="polite">
          <div>
            <div className="mono mut">Discovered in</div>
            <div className="big">Month {pad2(m)}</div>
          </div>
          <div>
            <div className="mono mut">Relative cost to fix</div>
            <div className="big">×{idx.toFixed(1)}</div>
          </div>
          <span className={v.pill}>{v.label}</span>
          <p>{v.text}</p>
        </div>
      </div>
    </div>
  );
}
