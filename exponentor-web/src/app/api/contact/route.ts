import { NextResponse } from "next/server";

/* POST /api/contact
   Delivers the contact form by email through Resend (https://resend.com).
   Needs RESEND_API_KEY and CONTACT_TO in the environment (see .env.example).
   Without them it answers 503 { reason: "not_configured" } and the form tells
   the visitor honestly that nothing was sent. */

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // Honeypot filled in => a bot. Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 4000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const from = process.env.CONTACT_FROM ?? "Exponentor Website <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New message from ${name} — exponentor website`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected the message", res.status, await res.text());
      return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact delivery failed", err);
    return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  }
}
