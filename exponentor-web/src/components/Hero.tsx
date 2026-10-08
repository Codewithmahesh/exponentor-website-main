import Instrument from "./Instrument";

export default function Hero() {
  return (
    <section className="hero ink">
      <div className="wrap">
        <div className="hero-top">
          <span className="pill">SaaS built for the real world</span>
          <span className="mono mut">Est. 2024 — Nanded, IN</span>
        </div>

        <h1 className="h-hero" aria-label="Stop finding out too late.">
          <span className="ln">
            <span>Stop finding out</span>
          </span>
          <span className="ln">
            <span className="it">too late.</span>
          </span>
        </h1>

        <div className="hero-sub">
          <p className="lede">
            Exponentor builds focused SaaS products that give people the right
            data before a small problem becomes an expensive crisis. Real estate
            first. Education next.
          </p>
          <div className="cta">
            <a className="btn sig" href="#products">
              See our products →
            </a>
            <a className="btn" href="#about">
              Who we are
            </a>
          </div>
        </div>

        <Instrument />

        <div className="stats rv">
          <div>
            <b>2</b>
            <span className="mono mut">Products building</span>
          </div>
          <div>
            <b>1</b>
            <span className="mono mut">Live &amp; growing</span>
          </div>
          <div>
            <b>0</b>
            <span className="mono mut">Compromises made</span>
          </div>
        </div>
      </div>
    </section>
  );
}
