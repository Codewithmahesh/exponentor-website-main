/* All site copy that is list-shaped lives here, so editing wording
   never means touching markup. */

export const EMAIL = "hello@exponentor.com";

export const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
] as const;

export const tickerItems = [
  "Real estate intelligence",
  "Student × industry",
  "Precision software",
  "No compromises",
  "Built to last",
  "Problem first",
] as const;

export const dna = [
  {
    n: "01",
    title: "Problem-first, always",
    body: "We don’t start with a cool idea. We start with a documented, expensive, recurring pain, then build the minimum thing that kills it cleanly.",
  },
  {
    n: "02",
    title: "Small teams move faster",
    body: "A small team. Zero meetings for the sake of meetings. From idea to working product while others are still naming the Slack channel.",
  },
  {
    n: "03",
    title: "Clarity over cleverness",
    body: "If a user can’t understand the product in 30 seconds, we redesign the product, not the onboarding. Simplicity is the hardest thing to build.",
  },
  {
    n: "04",
    title: "No compromises on quality",
    body: "We’d rather ship one thing right than five things mediocre. Every feature earns its place or it doesn’t exist.",
  },
] as const;

export const phases = [
  {
    phase: "Phase 01",
    status: "Live",
    pill: "alert",
    live: true,
    year: "2024",
    title: "XSITE — Live",
    tag: "Real estate cost intelligence",
    items: [
      "Real-time budget vs spend tracking",
      "Contractor invoice management",
      "Section-wise project breakdown",
      "Automated expenditure reports",
      "Milestone-linked payment alerts",
    ],
  },
  {
    phase: "Phase 02",
    status: "Building",
    pill: "",
    live: false,
    year: "2025",
    title: "JEMS — In development",
    tag: "Student × industry trust platform",
    items: [
      "Industry readiness scoring for students",
      "Verified skill profiles",
      "Smart recruiter–candidate matching",
      "Campus-to-company pipeline",
      "Hiring cost reduction analytics",
    ],
  },
  {
    phase: "Phase 03",
    status: "On the horizon",
    pill: "",
    live: false,
    year: "2026+",
    title: "Platform expansion",
    tag: "Going deeper, not wider",
    items: [
      "XSITE for pan-India developers",
      "JEMS institutional partnerships",
      "Data intelligence layer across products",
      "API ecosystem for integrations",
      "A new problem — if one finds us",
    ],
  },
] as const;

export const principles = [
  {
    head: "We pick ONE problem at a time.",
    sub: "Not twelve. One. And we solve it properly.",
  },
  {
    head: "We don’t scale before we’re right.",
    sub: "Right comes before fast. Always.",
  },
  {
    head: "We ship when it’s ready.",
    sub: "Not when the calendar says so.",
  },
] as const;

/* Manifesto is split into segments so the italic serif accent
   survives the word-by-word scroll reveal. */
export const manifesto = [
  { text: "Every crisis starts as a small number ", em: false },
  { text: "nobody was watching.", em: true },
  { text: " So we watch it.", em: false },
] as const;

export const team = [
  {
    initials: "RS",
    tone: "b",
    role: "Co-founder & CEO",
    name: "Rushikesh Shrimanwar",
    bio: "Sets where Exponentor goes next, and ships things that shouldn’t be possible to build in the time it takes others to write a brief. Believes the best technology is the kind users never have to think about. Precision over polish, always.",
    chips: ["Leadership", "Engineering", "Systems"],
  },
  {
    initials: "MG",
    tone: "a",
    role: "Co-founder & Managing Director",
    name: "Mahesh Giri",
    bio: "The one who looked at a ₹8 Cr real estate project bleeding money in silence and said: there has to be a better way. Obsessive about precision and outcomes, not activity. Built XSITE from a problem he watched unfold firsthand, not from a pitch deck.",
    chips: ["Product", "Vision", "Real estate"],
  },
  {
    initials: "PS",
    tone: "c",
    wide: true,
    role: "Growth & Partnerships",
    name: "Parmeshwar Sharma",
    bio: "Takes what we build out of the office and into the hands of the people it was built for. Turns first conversations with developers, colleges and companies into partnerships that last, because trust is earned one kept promise at a time.",
    chips: ["Growth", "Partnerships", "Relationships"],
  },
] as const;

export const faq = [
  {
    q: "What exactly does XSITE do?",
    a: "XSITE is a cost management platform for real estate developers. It tracks every contractor invoice, material purchase, and milestone payment against your approved project budget, section by section, in real time. You always know where your money is, not just where it was.",
  },
  {
    q: "Who is XSITE built for?",
    a: "Real estate developers who need to see where every rupee of a project budget stands, by section, while the project is still running.",
  },
  {
    q: "How is JEMS different from a job portal?",
    a: "A job portal lists openings. JEMS is a trust layer: it prepares students for what industry expects, builds verified skill profiles, and matches them with companies that want job-ready people.",
  },
  {
    q: "You’re a small team — can you actually deliver?",
    a: "Small teams move faster. We pick one problem at a time, ship when it’s ready, and XSITE is already live.",
  },
  {
    q: "Can I partner with or invest in Exponentor?",
    a: `Write to ${EMAIL} with a few lines on what you have in mind. We read every message.`,
  },
  {
    q: "Why two such different products?",
    a: "Both start the same way: a documented, expensive, recurring pain that nobody has fixed properly. We started with real estate and education is next.",
  },
] as const;

export const jemsTabs = [
  {
    id: "students",
    label: "For students",
    big: "Get ready",
    body: "Industry standards, tech roadmaps, and a profile that actually means something.",
    points: ["Campus-to-company pipeline", "Verified skill profiles"],
  },
  {
    id: "companies",
    label: "For companies",
    big: "Hire right",
    body: "Verified, job-ready talent. Lower hiring cost. Faster decisions.",
    points: [
      "Hiring cost reduction analytics",
      "Smart recruiter–candidate matching",
    ],
  },
] as const;
