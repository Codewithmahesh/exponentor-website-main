import { navLinks } from "@/lib/content";
import ScrollProgress from "./ScrollProgress";

export function Logo({ style }: { style?: React.CSSProperties }) {
  return (
    <a className="logo" href="#top" aria-label="Exponentor home" style={style}>
      <i />
      Exponentor
    </a>
  );
}

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Logo />
        <nav className="links mono" aria-label="Sections">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn" href="#contact">
          Let’s talk ↗
        </a>
      </div>
      <ScrollProgress />
    </header>
  );
}
