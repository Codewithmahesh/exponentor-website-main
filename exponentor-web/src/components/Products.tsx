import Counter from "./Counter";
import JemsTabs from "./JemsTabs";

type Meter = { label: string; pct: number; tone?: "a" | "o"; hot?: boolean };

const stages: Meter[] = [
  { label: "Foundation", pct: 90, tone: "a", hot: true },
  { label: "Structure", pct: 72 },
  { label: "Electrical", pct: 45 },
  { label: "Plumbing", pct: 60 },
];

function Bar({ pct, tone }: { pct: number; tone?: "a" | "o" }) {
  return (
    <div className="bar">
      <i className={tone} style={{ "--v": `${pct}%` } as React.CSSProperties} />
    </div>
  );
}

function XsiteDashboard() {
  return (
    <div className="dash" id="dash">
      <div className="dash-h mono">
        <span>Project overview — Sunrise Apartments, Phase 2</span>
        <span className="pill alert">Budget alert</span>
      </div>

      <div className="mt">
        <div className="mt-l">
          <span>Budget used</span>
          <span className="mono" style={{ color: "var(--sig)" }}>77.5%</span>
        </div>
        <Bar pct={77.5} tone="a" />
      </div>
      <div className="mt">
        <div className="mt-l">
          <span>Work complete</span>
          <span className="mono" style={{ color: "var(--ok)" }}>55%</span>
        </div>
        <Bar pct={55} tone="o" />
      </div>

      <div className="kp">
        <div>
          <span className="mono mut">Total budget</span>
          <b>₹8 Cr</b>
        </div>
        <div>
          <span className="mono mut">Spent</span>
          <b style={{ color: "var(--sig)" }}>
            ₹<Counter to={6.2} decimals={1} /> Cr
          </b>
        </div>
        <div>
          <span className="mono mut">Complete</span>
          <b>
            <Counter to={55} />%
          </b>
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {stages.map((s) => (
          <div className="mt" key={s.label}>
            <div className="mt-l">
              <span>{s.label}</span>
              <span
                className={s.hot ? "mono" : "mono mut"}
                style={s.hot ? { color: "var(--sig)" } : undefined}
              >
                {s.pct}%
              </span>
            </div>
            <Bar pct={s.pct} tone={s.tone} />
          </div>
        ))}
      </div>

      <p className="warn">Foundation spend 18% over plan — action needed</p>
      <p className="mono mut" style={{ fontSize: 11 }}>
        Reports: 3 pending · Section-wise ready
      </p>
    </div>
  );
}

export default function Products() {
  return (
    <section className="sec ink" id="products">
      <div className="wrap">
        <div className="split rv">
          <div>
            <span className="pill">What we’re building</span>
            <h2 className="h2" style={{ marginTop: 28 }}>
              Two industries.
              <br />
              <span className="it">Solved differently.</span>
            </h2>
          </div>
          <p className="lede">
            Each product is a precise fix for a specific, expensive problem. No
            bloat. No vague promises.
          </p>
        </div>

        <div className="prods">
          <article className="pc x rv">
            <div className="pc-h mono">
              <span>01 — Real estate</span>
              <span className="pill live">Live product</span>
            </div>
            <h3 className="pname">XSITE</h3>
            <p className="tag">Real estate cost intelligence</p>
            <p className="mut">
              Developers discover budget disasters in month 7 of a 12-month
              project, when it’s already too late to fix. XSITE tracks every
              rupee against every milestone in real time, so you catch problems
              in month 2.
            </p>
            <XsiteDashboard />
            <ul className="dots">
              <li>Section-wise budget tracking with live updates</li>
              <li>Contractor invoices matched against milestones</li>
              <li>Early alerts before overruns become irreversible</li>
            </ul>
            <a className="lk" href="#contact">
              Learn about XSITE <b>→</b>
            </a>
          </article>

          <article className="pc j rv">
            <div className="pc-h mono">
              <span>02 — Education</span>
              <span className="pill">In development</span>
            </div>
            <h3 className="pname">JEMS</h3>
            <p className="tag">Student × industry trust platform</p>
            <p className="mut">
              JEMS means trust. Students graduate without knowing what industry
              actually needs; companies burn months and lakhs on mismatched
              hires. JEMS is the trust layer between both sides.
            </p>
            <div className="gapbox">
              <span className="mono" style={{ color: "var(--sig)" }}>
                The gap that costs everyone
              </span>
              <p>Students graduate not knowing industry expectations</p>
              <p>Companies spend lakhs on wrong hires</p>
              <p>No trusted layer connecting both sides</p>
              <hr />
              <span className="mono" style={{ color: "var(--paper)" }}>
                JEMS closes the gap
              </span>
              <ul className="dots" style={{ color: "var(--paper)" }}>
                <li>Industry readiness scoring for students</li>
                <li>Verified skill profiles employers trust</li>
                <li>Smart recruiter–candidate matching</li>
                <li>Reduced time-to-hire by design</li>
              </ul>
            </div>
            <JemsTabs />
            <a className="lk" href="#contact">
              Join the waitlist <b>→</b>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
