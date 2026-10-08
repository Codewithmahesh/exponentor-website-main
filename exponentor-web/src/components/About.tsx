import { dna } from "@/lib/content";

export default function About() {
  return (
    <section className="sec paper" id="about">
      <div className="wrap">
        <div className="split">
          <div className="rv">
            <span className="pill">About — who we are</span>
            <h2 className="h2" style={{ marginTop: 28 }}>
              We build the thing
              <br />
              <span className="it">you wish existed.</span>
            </h2>
          </div>
          <div className="rv" style={{ display: "grid", gap: 28 }}>
            <p className="lede">
              Exponentor is a focused SaaS company with one mandate: find
              problems that cost people real money or real time, then build the
              precise fix. Not a feature. The fix. We started with real estate.
              We’re not stopping there.
            </p>
            <div className="cta">
              <a className="btn solid" href="#products">
                See XSITE →
              </a>
              <a className="btn" href="#products">
                See JEMS
              </a>
            </div>
          </div>
        </div>

        <div className="dna">
          {dna.map((d) => (
            <div className="dc rv" key={d.n}>
              <span className="n">{d.n}</span>
              <div>
                <h3 className="h3">{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </div>
          ))}
        </div>

        <figure className="pq rv">
          <span className="qm" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>
            A mistake caught early is a task. A mistake caught late is a{" "}
            <em>crisis.</em>
          </blockquote>
          <figcaption className="mono">Exponentor — why we exist</figcaption>
        </figure>
      </div>
    </section>
  );
}
