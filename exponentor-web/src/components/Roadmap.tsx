import { phases, principles } from "@/lib/content";

export default function Roadmap() {
  return (
    <section className="sec paper" id="roadmap">
      <div className="wrap">
        <div className="split rv">
          <div>
            <span className="pill">Roadmap — where we’re going</span>
            <h2 className="h2" style={{ marginTop: 28 }}>
              Built in sequence.
              <br />
              <span className="it">Not all at once.</span>
            </h2>
          </div>
          <p className="lede">
            We don’t build roadmaps for investors. We build them for ourselves,
            and we’re already ahead of schedule.
          </p>
        </div>

        <div className="track rv" aria-hidden="true">
          {phases.map((p) => (
            <div className="seg" key={p.phase}>
              <b />
              <span />
            </div>
          ))}
        </div>

        <div className="road">
          {phases.map((p) => (
            <article className={p.live ? "ph live rv" : "ph rv"} key={p.phase}>
              <div className="pc-h mono">
                <span>{p.phase}</span>
                <span className={p.pill ? `pill ${p.pill}` : "pill"}>{p.status}</span>
              </div>
              <div className="yr">{p.year}</div>
              <div>
                <h3 className="h3">{p.title}</h3>
                <p className="tag">{p.tag}</p>
              </div>
              <ul className="dots">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="p3">
          {principles.map((p) => (
            <div className="rv" key={p.head}>
              <b>{p.head}</b>
              <span>{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
