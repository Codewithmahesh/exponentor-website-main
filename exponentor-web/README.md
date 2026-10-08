# Exponentor website

Next.js (App Router) + TypeScript. Ported from the approved v3 design: ink / paper / signal-orange, Bricolage Grotesque + Instrument Serif italic accents, JetBrains Mono labels, Inter body.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

Node 20+ (built on Node 22).

## Structure

```
src/
  app/
    layout.tsx          fonts (self-hosted via @fontsource), metadata, `js` flag script
    page.tsx            page = list of sections
    globals.css         the whole design (tokens, sections, animations, responsive)
    api/contact/route.ts  contact form → email via Resend
    icon.svg            favicon
  components/
    Nav, Hero, Ticker, About, Products, Roadmap, Team, FaqSection, Contact, Footer   (server components)
    Instrument.tsx      "cost of a surprise" chart: draw-in intro, drag/scrub, live readout
    JemsTabs.tsx        For students / For companies (arrow-key accessible tabs)
    Manifesto.tsx       words light up on scroll
    Faq.tsx             accordion
    Counter.tsx         count-up numbers
    Motion.tsx          scroll-reveal for everything marked .rv / .bar / .track
    ScrollProgress.tsx  orange progress bar under the nav
    ContactForm.tsx, CopyEmail.tsx
  lib/content.ts        list-shaped copy (FAQ, roadmap phases, team, principles, manifesto…)
```

Edit wording in `src/lib/content.ts` (lists) or the section component (one-off copy). Design tokens are the `:root` variables at the top of `globals.css`.

All animation respects `prefers-reduced-motion`.

## Contact form

`POST /api/contact` sends the message through [Resend](https://resend.com). Set these (locally in `.env.local`, on Vercel under Project → Settings → Environment Variables):

```
RESEND_API_KEY=...
CONTACT_TO=hello@exponentor.com
CONTACT_FROM="Exponentor Website <website@yourdomain>"   # optional; domain must be verified in Resend
```

Until `RESEND_API_KEY` and `CONTACT_TO` are set, the form tells the visitor honestly that nothing was sent and shows the email address instead. It includes a honeypot field and server-side validation. For production you may also want rate limiting (e.g. Vercel WAF or Upstash).

## Deploy

Push to GitHub and import in Vercel (framework preset: Next.js, no config needed), or run `npx vercel`.

## Placeholders to replace before launch

- Founder tiles use initials, not photos.
- "Connect ↗", LinkedIn, and Twitter/X are not linked to real profiles yet.
- FAQ answers 2–6 were drafted, not supplied. Review them.
- Hero chart is an illustrative model, labelled as such on the page.
