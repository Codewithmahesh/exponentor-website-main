import { EMAIL } from "@/lib/content";
import { Logo } from "./Nav";

export default function Footer() {
  return (
    <footer className="foot ink">
      <div className="wrap">
        <div className="fcols">
          <div>
            <Logo style={{ marginBottom: 18 }} />
            <p className="mut" style={{ maxWidth: "26em", lineHeight: 1.55 }}>
              Building focused SaaS products for real-world problems. Starting
              with real estate. Not stopping there.
            </p>
          </div>
          <div>
            <span className="mono">Products</span>
            <a href="#products">
              XSITE<small>LIVE</small>
            </a>
            <a href="#products">
              JEMS<small>SOON</small>
            </a>
          </div>
          <div>
            <span className="mono">Company</span>
            <a href="#about">About</a>
            <a href="#team">Team</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <div>
            <span className="mono">Connect</span>
            <p>{EMAIL}</p>
            <p>LinkedIn</p>
            <p>Twitter / X</p>
          </div>
        </div>
        <div className="legal mono">
          <span>© 2024–{new Date().getFullYear()} Exponentor. All rights reserved.</span>
          <span>Building things that matter.</span>
        </div>
        <p className="wm" aria-hidden="true">
          Exponentor
        </p>
      </div>
    </footer>
  );
}
