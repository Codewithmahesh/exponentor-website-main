import { team } from "@/lib/content";

export default function Team() {
  return (
    <section className="sec ink" id="team">
      <div className="wrap">
        <div className="split rv">
          <div>
            <span className="pill">The team</span>
            <h2 className="h2" style={{ marginTop: 28 }}>
              Small team.
              <br />
              <span className="it">Serious intent.</span>
            </h2>
          </div>
          <p className="lede">
            Three people. No layers between the problem and the product.
          </p>
        </div>

        <div className="team">
          {team.map((m) => (
            <article className={"wide" in m ? "fc rv wide" : "fc rv"} key={m.name}>
              <div className={`tile ${m.tone}`}>
                <span className="mono">{m.role}</span>
                <b aria-hidden="true">{m.initials}</b>
              </div>
              <div className="fb">
                <span className="mono role">{m.role}</span>
                <h3 className="fname">{m.name}</h3>
                <p className="mut">{m.bio}</p>
                <div className="chips">
                  {m.chips.map((c) => (
                    <span className="pill" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <span className="cn">
                  Connect <b>↗</b>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
