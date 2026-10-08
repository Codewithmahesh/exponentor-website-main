import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";

export default function Contact() {
  return (
    <section className="sec ink" id="contact">
      <div className="wrap cg">
        <div>
          <span className="pill">Get in touch</span>
          <h2 className="h-talk">
            Let’s <span className="it">talk.</span>
          </h2>
          <p className="lede" style={{ marginBottom: 36 }}>
            Whether you’re a real estate developer curious about XSITE, a student
            or company interested in JEMS, or just want to say hello, we read
            every message.
          </p>
          <CopyEmail />
          <div className="cr">
            <span className="mono mut">LinkedIn</span>
            <span className="v">/exponentor</span>
          </div>
          <div className="cr">
            <span className="mono mut">Twitter / X</span>
            <span className="v">@exponentor</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
