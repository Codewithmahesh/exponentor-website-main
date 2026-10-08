import type { Metadata, Viewport } from "next";

import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://exponentor-website.vercel.app";

const description =
  "Exponentor builds focused SaaS products that give people the right data before a small problem becomes an expensive crisis. Real estate first. Education next.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Exponentor — Stop finding out too late.",
    template: "%s · Exponentor",
  },
  description,
  openGraph: {
    title: "Exponentor — Stop finding out too late.",
    description,
    url: "/",
    siteName: "Exponentor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exponentor — Stop finding out too late.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0B",
  colorScheme: "dark",
};

/* Adds the `js` class before first paint so the CSS only hides
   reveal-on-scroll content when scripts are actually running. */
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
