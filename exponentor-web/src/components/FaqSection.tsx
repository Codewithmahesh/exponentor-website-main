import { EMAIL } from "@/lib/content";
import Faq from "./Faq";

export default function FaqSection() {
  return (
    <section className="sec paper" id="faq">
      <div className="wrap faq">
        <div
          className="rv"
          style={{ position: "sticky", top: 100, display: "grid", gap: 26 }}
        >
          <span className="pill" style={{ justifySelf: "start" }}>
            Questions
          </span>
          <h2 className="h2">
            If you’re
            <br />
            <span className="it">wondering.</span>
          </h2>
          <p className="lede">
            We keep it honest. No PR-speak, no corporate dodge. If your question
            isn’t here, email us.
          </p>
          <p className="mono">{EMAIL}</p>
        </div>
        <Faq />
      </div>
    </section>
  );
}
